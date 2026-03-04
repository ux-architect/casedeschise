'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

type ScannerClientProps = { onScanAction: (decodedText: string) => Promise<boolean>}

export default function ScannerClient({ onScanAction }: ScannerClientProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const hasScannedRef = useRef(false)
  const isProcessingRef = useRef(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    const stopScanner = async () => {try { await scanner.stop() } catch {} }

    const handleScan = async (decodedText: string) => {
      // Prevent duplicate scans and concurrent processing
      if (hasScannedRef.current || isProcessingRef.current) {return}
      isProcessingRef.current = true

      try {
        
        // Validate the scanned QR code
        const isValid = await onScanAction(decodedText)
        debugger
        // Show error if QR code is invalid
        if (!isValid) { setErrorMessage(`QR invalid: ${decodedText}`); return;}

        // Clear previous errors and mark as scanned
        setErrorMessage('')
        hasScannedRef.current = true
        // Stop the scanner after successful scan
        await stopScanner()
      } finally {
        // Reset processing flag
        isProcessingRef.current = false
      }
    }

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        handleScan,
        () => {}
      )
      .catch(console.error)

    return () => { stopScanner() }

  }, [onScanAction])

  return (
    <>
      <div id="qr-reader" style={{ width: 300 }} />
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  )
}