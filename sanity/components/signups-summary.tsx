import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, Flex, Stack, Text, TextInput } from '@sanity/ui'
import { useClient } from 'sanity'
import './signups-summary.scss'

type SignupEntry = {
  _id: string
  _createdAt?: string
  contact?: { name?: string; email?: string; phone?: string }
  details?: string
  objectives?: Array<{ _key?: string; status?: number }>
  optionalItems?: string
  metadata?: { year?: string }
}

function formatDate(value?: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${dd}.${mm} (${hh}:${min})`
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
    .map((o) => {
      const key = o._key || ''
      return typeof o.status === 'number' ? `${key}[${o.status}]` : key
    })
    .join(';  ')
}

export default function SignupsSummary({ schemaType, title }: { schemaType: string; title: string }) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [entries, setEntries] = useState<SignupEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeletingAll, setIsDeletingAll] = useState(false)

  useEffect(() => {
    let mounted = true
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await client.fetch<SignupEntry[]>(
          `*[_type == $schemaType] | order(coalesce(metadata.year, "") desc, _createdAt desc){
            _id, _createdAt, contact{name, email, phone}, details, objectives[]{_key, status}, optionalItems, metadata
          }`,
          { schemaType }
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
  }, [client, schemaType])

  const filtered = useMemo(() => {
    if (!search.trim()) return entries
    const q = search.toLowerCase()
    return entries.filter((e) => {
      const haystack = [e.contact?.name, e.contact?.email, e.contact?.phone, e.optionalItems, formatObjectives(e.objectives), e.metadata?.year]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [entries, search])

  const tsvText = useMemo(() => {
    const header = ['An', 'Contact', 'Data înscriere', 'Obiective', 'Date opționale', 'Creat la'].join('\t')
    const rows = filtered.map((e) =>
      [
        toTsvCell(e.metadata?.year),
        toTsvCell([e.contact?.name, e.contact?.email, e.contact?.phone].filter(Boolean).join(' | ')),
        toTsvCell(formatDate(e.details)),
        toTsvCell(formatObjectives(e.objectives)),
        toTsvCell(e.optionalItems),
        toTsvCell(formatDate(e._createdAt)),
      ].join('\t')
    )
    return [header, ...rows].join('\n')
  }, [filtered])

  const filteredIds = useMemo(() => filtered.map((entry) => entry._id), [filtered])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tsvText)
    } catch {
      setError('Copierea automată a eșuat. Selectează textul și copiază manual.')
    }
  }, [tsvText])

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm('Sigur vrei să ștergi această înscriere?')
    if (!confirmed) return

    try {
      setDeletingId(id)
      setError(null)
      await client.delete(id)
      setEntries((prev) => prev.filter((entry) => entry._id !== id))
    } catch {
      setError('Ștergerea înscrierii a eșuat.')
    } finally {
      setDeletingId((current) => (current === id ? null : current))
    }
  }, [client])

  const handleDeleteAll = useCallback(async () => {
    if (filteredIds.length === 0) return

    const confirmed = window.confirm(`Sigur vrei să ștergi toate cele ${filteredIds.length} înscrieri afișate?`)
    if (!confirmed) return

    try {
      setIsDeletingAll(true)
      setError(null)

      const tx = client.transaction()
      filteredIds.forEach((id) => tx.delete(id))
      await tx.commit()

      const idsSet = new Set(filteredIds)
      setEntries((prev) => prev.filter((entry) => !idsSet.has(entry._id)))
    } catch {
      setError('Ștergerea tuturor înscrierilor afișate a eșuat.')
    } finally {
      setIsDeletingAll(false)
    }
  }, [client, filteredIds])

  return (
    <Card padding={4} sizing="border" className="signups-summary">
      <Stack space={4}>
        {/* Header */}
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Text size={2} weight="semibold">{title}</Text>
          <Flex align="center" gap={2}>
            <Text size={1} muted>{filtered.length} / {entries.length} înscrieri</Text>
            <Button mode="ghost" text="Copiază TSV" onClick={handleCopy} disabled={isLoading || filtered.length === 0} />
          </Flex>
        </Flex>

        {/* Search */}
        <TextInput
          placeholder="Caută după nume, email, telefon…"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        {isLoading && <Text size={1}>Se încarcă…</Text>}
        {error && <Text size={1} style={{ color: 'var(--card-badge-critical-fg-color)' }}>{error}</Text>}

        {/* Table */}
        {!isLoading && !error && (
          <Box className="signups-summary__table-panel">
            <Box className="signups-summary__table-wrap">
              <table className="signups-summary__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Contact</th>
                    <th>Data înscriere</th>
                    <th>Obiective</th>
                    <th>Date opționale</th>
                    <th>Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry, i) => (
                    <tr key={entry._id}>
                      <td className="signups-summary__cell--num">{i + 1}</td>
                      <td className="signups-summary__cell--contact">
                        {entry.contact?.name && <span>{entry.contact.name}</span>}
                        {entry.contact?.email && <span>{entry.contact.email}</span>}
                        {entry.contact?.phone && <span>{entry.contact.phone}</span>}
                      </td>
                      <td>{formatDate(entry.details)}</td>
                      <td className="signups-summary__cell--objectives">{formatObjectives(entry.objectives)}</td>
                      <td>{entry.optionalItems}</td>
                      <td className="signups-summary__cell--actions">
                        <Flex gap={1} align="center" wrap="nowrap">
                          <Button
                            className="signups-summary__delete-btn"
                            mode="default"
                            tone="critical"
                            text={deletingId === entry._id ? 'Se șterge…' : 'Șterge'}
                            onClick={() => handleDelete(entry._id)}
                            disabled={deletingId === entry._id || isDeletingAll}
                          />
                        </Flex>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>
                        {search ? 'Niciun rezultat pentru căutare.' : 'Nicio înscriere.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
            <Flex className="signups-summary__footer-cell" align="center" justify="space-between" gap={2}>
              <Text size={1}>Afișate: {filtered.length} din {entries.length} înscrieri</Text>
              <Button
                className="signups-summary__delete-btn"
                mode="default"
                tone="critical"
                text={isDeletingAll ? 'Se șterg toate…' : 'Șterge toate'}
                onClick={handleDeleteAll}
                disabled={isDeletingAll || filtered.length === 0 || isLoading}
              />
            </Flex>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
