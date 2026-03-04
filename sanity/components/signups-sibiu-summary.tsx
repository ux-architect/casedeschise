import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, Flex, Stack, Text, TextArea } from '@sanity/ui'
import { useClient } from 'sanity'

type SignupEntry = {
  _id: string
  _createdAt?: string
  name?: string
  email?: string
  phone?: string
  details?: string
  objectives?: Array<{ _key?: string, status?: number}>
  metadata?: { year?: string }
}

function formatDate(value?: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('ro-RO')
}

function toTsvCell(value?: string) {
  if (!value) return ''
  const escaped = value.replace(/"/g, '""')
  if (escaped.includes('\t') || escaped.includes('\n') || escaped.includes('"')) {
    return `"${escaped}"`
  }
  return escaped
}

function formatObjectives(objectives?: SignupEntry['objectives']) {
  if (!objectives?.length) return ''
  return objectives
    .map((objective) => {
      const key = objective._key || ''
      if (typeof objective.status === 'number') {
        return `${key}: ${objective.status}`
      }
      return key
    })
    .join('\n')
}

export default function SignupsSibiuSummary() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [entries, setEntries] = useState<SignupEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await client.fetch<SignupEntry[]>(
          `*[_type == "signups-sibiu"] | order(coalesce(metadata.year, "") desc, _createdAt desc){
            _id, _createdAt, name, email, phone, details, objectives[]{_key, status}, metadata
          }`
        )

        if (mounted) setEntries(data || [])
      } catch {
        if (mounted) setError('Nu am putut încărca înscrierile.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadData()

    return () => { mounted = false }
  }, [client])

  const summaryText = useMemo(() => {
    const header = ['An', 'Nume', 'Email', 'Telefon', 'Detalii', 'Obiective', 'Creat la'].join('\t')
    const rows = entries.map((entry) => [
      toTsvCell(entry.metadata?.year),
      toTsvCell(entry.name),
      toTsvCell(entry.email),
      toTsvCell(entry.phone),
      toTsvCell(formatDate(entry.details)),
      toTsvCell(formatObjectives(entry.objectives)),
      toTsvCell(formatDate(entry._createdAt)),
    ].join('\t'))

    return [header, ...rows].join('\n')
  }, [entries])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
    } catch {
      setError('Copierea automată a eșuat. Selectează textul și copiază manual.')
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text size={2} weight="semibold">Sumar înscrieri Sibiu</Text>
          <Button
            mode="default"
            text="Copiază tot"
            onClick={handleCopy}
            disabled={isLoading || entries.length === 0}
          />
        </Flex>

        <Text size={1} muted>
          Formatul este TSV (coloane separate prin TAB), potrivit pentru paste în Excel/Sheets.
        </Text>

        {isLoading && <Text size={1}>Se încarcă...</Text>}
        {error && <Text size={1}>{error}</Text>}

        <Box>
          <TextArea
            readOnly
            rows={Math.min(Math.max(entries.length + 2, 8), 26)}
            value={summaryText}
          />
        </Box>
      </Stack>
    </Card>
  )
}
