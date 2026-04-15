'use client'

import { CSSProperties, ReactNode, useEffect, useRef } from 'react'

type AutoFitTextProps = {
  children: ReactNode
  className?: string
  minFontSize?: number
  maxFontSize?: number
  step?: number
  style?: CSSProperties
}

export default function AutoFitText({
  children,
  className = '',
  minFontSize = 10,
  maxFontSize,
  step = 0.5,
  style,
}: AutoFitTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let frameId = 0

    const fitText = () => {
      cancelAnimationFrame(frameId)

      frameId = window.requestAnimationFrame(() => {
        const computedStyle = window.getComputedStyle(element)
        const startingFontSize = maxFontSize ?? (Number.parseFloat(computedStyle.fontSize) || 16)

        let nextFontSize = startingFontSize
        element.style.fontSize = `${startingFontSize}px`

        while (nextFontSize > minFontSize && element.scrollWidth > element.clientWidth) {
          nextFontSize -= step
          element.style.fontSize = `${nextFontSize}px`
        }

        if (nextFontSize <= minFontSize && element.scrollWidth > element.clientWidth) {
          element.style.whiteSpace = 'normal'
        } else {
          element.style.whiteSpace = 'nowrap'
        }
      })
    }

    fitText()

    const resizeObserver = new ResizeObserver(() => { fitText() })

    if (element.parentElement) { resizeObserver.observe(element.parentElement) }

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [children, minFontSize, maxFontSize, step])

  return (
    <span
      ref={elementRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        minWidth: 0,
        // whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  )
}