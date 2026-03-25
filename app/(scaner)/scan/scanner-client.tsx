'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import type { SignupFormProjectType } from '@/types'

type ScannerClientProps = {
  validateSignup: (data: { signupId: string, objectiveKey: string }) => Promise<boolean>
  objectives?: SignupFormProjectType[]
}

export default function ScannerClient({ validateSignup, objectives = [] }: ScannerClientProps) {
  const hasScannedRef = useRef(false)
  const isProcessingRef = useRef(false)
  const [scanMessage, setScanMessage] = useState('')
  const selectedObjectiveRef = useRef<string>( objectives.find((objective) => Boolean(objective.code))?.code ?? '')
  const [selectedObjectiveState, setSelectedObjectiveState] = useState<string>(selectedObjectiveRef.current)

      const processScan = async (decodedText: string) => {
      if (hasScannedRef.current || isProcessingRef.current) {return}
      isProcessingRef.current = true

      try {
        const parsedQR = JSON.parse(decodedText.trim()) as unknown
        if (!Array.isArray(parsedQR) || typeof parsedQR[0] !== 'string') {
          setScanMessage(`Cannot read: ${decodedText}`)
          return
        }

        const id = parsedQR[0].trim();
        const name = parsedQR[1].trim();
        const objectivesString = typeof parsedQR[2] === 'string' ? parsedQR[2].trim() : '';
        const locationKey = selectedObjectiveRef.current;
        const idIsGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
        const qrObjectives = objectivesString.split(';').map(s => s.trim());

        debugger
        if ( !idIsGuid) { setScanMessage(`QR invalid: ${decodedText}`); return;}
        if ( !qrObjectives.includes(locationKey)) { setScanMessage(`${name}: Obiectiv ne-inregistrat`); return;}

        

        const result = await validateSignup({ signupId: id, objectiveKey: locationKey })
        if (!result) { setScanMessage(`Problem on Sanity: ${decodedText}`); return;}

        setScanMessage('')
        hasScannedRef.current = true

        setScanMessage(`Valid! ${name}!`)
      } catch {
        setScanMessage(`QR invalid: ${decodedText}`)
      } finally {
        isProcessingRef.current = false
      }
    }

  useEffect(() => {
    if (!selectedObjectiveRef.current && objectives.length > 0) {
      const firstCode = objectives.find((objective) => Boolean(objective.code))?.code ?? ''
      selectedObjectiveRef.current = firstCode
       setSelectedObjectiveState(firstCode)
    }
  }, [objectives])

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

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="objective-select" style={{ display: 'block', marginBottom: 6 }}> Obiectiv </label>
        <select id="objective-select" value={selectedObjectiveState}
          onChange={(e) => {
            selectedObjectiveRef.current = e.target.value
            setSelectedObjectiveState(e.target.value)
          }}
        >
          {objectives.map((objective) => (
            objective.code ? (
              <option key={objective.code} value={objective.code}>{objective.name ?? objective.code}</option>
            ) : null
          ))}
        </select>
      </div>
      <div id="qr-reader" style={{ width: 300 }} />
      {scanMessage ? <p>{scanMessage}</p> : null}
    </>
  )
}