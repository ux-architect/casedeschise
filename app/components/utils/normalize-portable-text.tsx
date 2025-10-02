// lib/normalizePortableText.ts

export interface PortableTextSpan {
  _type: 'span'
  text: string
  marks?: string[]
  [key: string]: any
}

export interface PortableTextBlock {
  _type: 'block'
  style?: string
  children: PortableTextSpan[]
  [key: string]: any
}

export type PortableText = (PortableTextBlock | any)[]

/**
 * Normalize Portable Text:
 * - Splits ALL newlines (\n, \n\n) into new blocks
 * - Preserves marks (strong, em, links, etc.)
 * - Merges consecutive spans with identical marks
 */
export function normalizePortableText(value: PortableText = []): PortableText {
  const normalized: PortableText = []

  value.forEach(block => {
    if (block._type !== 'block' || !Array.isArray(block.children)) {
      normalized.push(block)
      return
    }

    let splitBlocks: PortableTextBlock[] = []

    block.children.forEach((child: any) => {
      if (child._type === 'span' && typeof child.text === 'string' && child.text.includes('\n')) {
        // Split on 1+ newlines
        const parts = child.text.split(/\n+/).filter(Boolean)

        parts.forEach((part: any) => {
          splitBlocks.push({
            ...block,
            children: [
              {
                ...child,
                text: part,        // cleaned text
                marks: child.marks // preserve bold/italic/link marks
              }
            ]
          })
        })
      } else {
        // No newline: just push into last or new block
        if (!splitBlocks.length) {
          splitBlocks.push({ ...block, children: [child] })
        } else {
          splitBlocks[splitBlocks.length - 1].children.push(child)
        }
      }
    })

    splitBlocks.forEach(b => normalized.push(mergeConsecutiveSpans(b)))
  })

  return normalized
}

function mergeConsecutiveSpans(block: PortableTextBlock): PortableTextBlock {
  if (!block.children || block.children.length < 2) return block

  const merged: PortableTextSpan[] = []

  block.children.forEach(child => {
    const last = merged[merged.length - 1]
    if (
      last &&
      child._type === 'span' &&
      last._type === 'span' &&
      JSON.stringify(last.marks || []) === JSON.stringify(child.marks || [])
    ) {
      last.text += child.text
    } else {
      merged.push(child)
    }
  })

  return { ...block, children: merged }
}
