'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import type { SignupFormProjectType } from '@/types'

type ScannerClientProps = {
  validateSignup: (data: { signupId: string, objectiveKey: string }) => Promise<boolean>
  objectives?: SignupFormProjectType[]
}

export default function ScannerClient({ validateSignup, objectives = [] }: ScannerClientProps) {
  const isProcessingRef = useRef(false)
  const [scanData_name, setScanData_name] = useState<string>('')
  const [scanStatus, setScanStatus] = useState<'idle' | 'qr-invalid' | 'qr-valid-objective-not-added' | 'qr-validated' | 'qr-valid-sanity-error' | 'error'>('idle')
  const selectedObjectiveRef = useRef<string>('')
  const [selectedObjectiveState, setSelectedObjectiveState] = useState<string>('')

    const processScan = async (decodedText: string) => {
    if (isProcessingRef.current) {return}
    isProcessingRef.current = true

    try {
      
      const parsedQR = JSON.parse(decodedText.trim()) as unknown
      if (!Array.isArray(parsedQR) || typeof parsedQR[0] !== 'string') { setScanStatus('qr-invalid'); return; }

      const id = parsedQR[0].trim();
      const name = parsedQR[1].trim();
      const objectivesString = typeof parsedQR[2] === 'string' ? parsedQR[2].trim() : '';
      const locationKey = selectedObjectiveRef.current;
      const idIsGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
      const qrObjectives = objectivesString.split(';').map(s => s.trim());

      if ( !idIsGuid) { setScanStatus('qr-invalid'); return;}
      if ( !qrObjectives.includes(locationKey)) { setScanStatus('qr-valid-objective-not-added'); setScanData_name(name); return;}  

      const result = await validateSignup({ signupId: id, objectiveKey: locationKey })
      if (!result) { setScanStatus('qr-valid-sanity-error'); return;}

      setScanStatus('qr-validated'); 
      setScanData_name(name);
    } catch {
      setScanStatus('error')
    } finally {
      isProcessingRef.current = false
    }
  }

  useLayoutEffect(() => {
    if (objectives.length === 0) return

    const validCodes = objectives.map((objective) => objective.code).filter((code): code is string => Boolean(code))

    if (validCodes.length === 0) return

    const storedCode = window.localStorage.getItem('scanner:selected-objective') || ''
    const nextCode = validCodes.includes(storedCode) ? storedCode : validCodes[0]

    selectedObjectiveRef.current = nextCode
    setSelectedObjectiveState(nextCode)
  }, [objectives])

  useEffect(() => {
    if (!selectedObjectiveState) return
    window.localStorage.setItem('scanner:selected-objective', selectedObjectiveState)
  }, [selectedObjectiveState])

  useEffect(() => {
    if (scanStatus === 'idle') return
    const timer = window.setTimeout(() => { setScanStatus('idle'); setScanData_name('') }, 5000)
    return () => window.clearTimeout(timer)
  }, [scanStatus])

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader')

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        processScan,
        () => {}
      )
      .catch(console.error)

    return () => { void scanner.stop().catch(() => {}) }
  }, [validateSignup])

    
  const scanResultText =  scanStatus == 'idle' ? "" : 
                          scanStatus === 'qr-invalid' ? "QR invalid!" : 
                          scanStatus === 'qr-valid-objective-not-added' ? "Obiectiv neînregistrat!" : 
                          scanStatus === 'qr-valid-sanity-error'? "Problem on Sanity!":
                          scanStatus === 'qr-validated' ? "Valid!" : "Eroare necunoscută!";
          
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="objective-select" style={{ display: 'block', marginBottom: 6 }}> Obiectiv </label>
        <select id="objective-select" value={selectedObjectiveState}
          onChange={(e) => {
            selectedObjectiveRef.current = e.target.value
            setSelectedObjectiveState(e.target.value)
          }}>
          {objectives.map((objective) => (  objective.code ? ( <option key={objective.code} value={objective.code}>{objective.name ?? objective.code}</option>) : null  ))}
        </select>
      </div>

      <div id="qr-reader" style={{ width: 300 }} />

      <span className={`clearfix scan-status ${scanStatus}`}>
        {scanData_name && <span className="scan-data w-100 float-left text-align-center mb-5">Nume: {scanData_name}</span>}
        <span className='scan-result w-100 float-left text-align-center'>{scanResultText}</span>
      </span>
    </>
  )
}