import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, Flex, Stack, Text, TextInput } from '@sanity/ui'
import { useClient } from 'sanity'
import './signups-summary.scss'

type SignupObjective = { _key?: string; status?: number }

type SignupEntry = {
  _id: string
  _createdAt?: string
  contact?: { name?: string; email?: string; phone?: string }
  details?: string
  objectives?: SignupObjective[]
  optionalItems?: string
  metadata?: { year?: string }
}

type SignupFormProject = { code?: string; name?: string }

type SignupFormProjectsResponse = {
  s1_projects?: SignupFormProject[]
  s2_projects?: SignupFormProject[]
  s3_projects?: SignupFormProject[]
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

function formatObjectives(objectives?: SignupObjective[]) {
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
  const [signupEntries, setSignupEntries] = useState<SignupEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedObjectiveCode, setSelectedObjectiveCode] = useState('')
  const [objectiveLabelByCode, setObjectiveLabelByCode] = useState<Record<string, string>>({})
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null)
  const [isDeletingAll, setIsDeletingAll] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        setIsLoading(true)
        setErrorMessage(null)

        const entriesData = await client.fetch<SignupEntry[]>(
          `*[_type == $schemaType] | order(coalesce(metadata.year, "") desc, _createdAt desc){
            _id, _createdAt, contact{name, email, phone}, details, objectives[]{_key, status}, optionalItems, metadata
          }`,
          { schemaType }
        )

        const signupFormType = schemaType.includes('sibiu') ? 'signup-form-sibiu' : schemaType.includes('valcea') ? 'signup-form-valcea' : null

        if (signupFormType) {
          const signupFormData = await client.fetch<SignupFormProjectsResponse>(`*[_type == $signupFormType][0]{s1_projects[]{code, name}, s2_projects[]{code, name}, s3_projects[]{code, name}}`, { signupFormType })
          const allProjects = [...(signupFormData?.s1_projects || []), ...(signupFormData?.s2_projects || []), ...(signupFormData?.s3_projects || [])]
          const labelsByCode: Record<string, string> = {}
          allProjects.forEach((project) => { const code = (project.code || '').trim(); const name = (project.name || '').trim(); if (code && name) labelsByCode[code] = name })

          if (mounted) setObjectiveLabelByCode(labelsByCode)
        } else if (mounted) {
          setObjectiveLabelByCode({})
        }

        if (mounted) setSignupEntries(entriesData || [])
      } catch {
        if (mounted) setErrorMessage('Nu am putut încărca înscrierile.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadData()

    return () => { mounted = false }
  }, [client, schemaType])

  const objectiveOptions = useMemo(() => {
    const formSetupCodes = Object.keys(objectiveLabelByCode).filter(Boolean)

    if (formSetupCodes.length > 0) {
      return formSetupCodes
        .map((code) => ({ code, label: objectiveLabelByCode[code] || code }))
        .sort((a, b) => a.label.localeCompare(b.label, 'ro'))
    }

    const allObjectives = signupEntries.flatMap((entry) => entry.objectives || [])

    const uniqueObjectives = new Set(
      allObjectives
        .map((objective) => (objective._key || '').trim())
        .filter(Boolean)
    )

    return Array.from(uniqueObjectives)
      .map((code) => ({ code, label: objectiveLabelByCode[code] || code }))
      .sort((a, b) => a.label.localeCompare(b.label, 'ro'))
  }, [objectiveLabelByCode, signupEntries])

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return signupEntries.filter((entry) => {
      const matchesObjective =
        !selectedObjectiveCode ||
        (entry.objectives || []).some((objective) => (objective._key || '').trim() === selectedObjectiveCode)

      if (!matchesObjective) return false
      if (!normalizedQuery) return true

      const haystack = [entry.contact?.name, entry.contact?.email, entry.contact?.phone, entry.optionalItems, formatObjectives(entry.objectives), entry.metadata?.year]
        .filter(Boolean).join(' ').toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [searchQuery, selectedObjectiveCode, signupEntries])

  const tsvText = useMemo(() => {
    const header = ['An', 'Contact', 'Data înscriere', 'Obiective', 'Date opționale', 'Creat la'].join('\t')
    const rows = filteredEntries.map((entry) =>
      [
        toTsvCell(entry.metadata?.year),
        toTsvCell([entry.contact?.name, entry.contact?.email, entry.contact?.phone].filter(Boolean).join(' | ')),
        toTsvCell(formatDate(entry.details)),
        toTsvCell(formatObjectives(entry.objectives)),
        toTsvCell(entry.optionalItems),
        toTsvCell(formatDate(entry._createdAt)),
      ].join('\t')
    )
    return [header, ...rows].join('\n')
  }, [filteredEntries])

  const filteredEntryIds = useMemo(() => filteredEntries.map((entry) => entry._id), [filteredEntries])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tsvText)
    } catch {
      setErrorMessage('Copierea automată a eșuat. Selectează textul și copiază manual.')
    }
  }, [tsvText])

  const deleteEntry = useCallback(async (id: string) => {
    const confirmed = window.confirm('Sigur vrei să ștergi această înscriere?')
    if (!confirmed) return

    try {
      setDeletingEntryId(id)
      setErrorMessage(null)
      await client.delete(id)
      setSignupEntries((prev) => prev.filter((entry) => entry._id !== id))
    } catch {
      setErrorMessage('Ștergerea înscrierii a eșuat.')
    } finally {
      setDeletingEntryId((current) => (current === id ? null : current))
    }
  }, [client])

  const deleteAll = useCallback(async () => {
    if (filteredEntryIds.length === 0) return

    const confirmed = window.confirm(`Sigur vrei să ștergi toate cele ${filteredEntryIds.length} înscrieri afișate?`)
    if (!confirmed) return

    try {
      setIsDeletingAll(true)
      setErrorMessage(null)

      const tx = client.transaction()
      filteredEntryIds.forEach((id) => tx.delete(id))
      await tx.commit()

      const idsToDelete = new Set(filteredEntryIds)
      setSignupEntries((prev) => prev.filter((entry) => !idsToDelete.has(entry._id)))
    } catch {
      setErrorMessage('Ștergerea tuturor înscrierilor afișate a eșuat.')
    } finally {
      setIsDeletingAll(false)
    }
  }, [client, filteredEntryIds])

  return (
    <Card padding={4} sizing="border" className="signups-summary">
      <Stack space={4}>
        {/* Header */}
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Text size={2} weight="semibold">{title}</Text>
          <Flex align="center" gap={2}>
            <Text size={1} muted>{filteredEntries.length} / {signupEntries.length} înscrieri</Text>
            <Button mode="ghost" text="Copiază TSV" onClick={handleCopy} disabled={isLoading || filteredEntries.length === 0} />
          </Flex>
        </Flex>

        {/* Filters */}
        <Flex gap={2} wrap="wrap">
          <Box flex={1} style={{ minWidth: 260 }}>
            <TextInput
              placeholder="Caută după nume, email, telefon…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Box>
          <Box style={{ minWidth: 260 }}>
            <select className="objective-filter" aria-label="Filtrează după obiectiv" value={selectedObjectiveCode} onChange={(e) => setSelectedObjectiveCode(e.currentTarget.value)}>
              <option value="">Toate obiectivele</option>
              {objectiveOptions.map((objective) => (
                <option key={objective.code} value={objective.code}>{objective.label}</option>
              ))}
            </select>
          </Box>
        </Flex>

        {isLoading && <Text size={1}>Se încarcă…</Text>}
        {errorMessage && <Text size={1} style={{ color: 'var(--card-badge-critical-fg-color)' }}>{errorMessage}</Text>}

        {/* Table */}
        {!isLoading && !errorMessage && (
          <Box className="signups-summary__table-panel">
            <Box className="signups-summary__table-wrap">
              <table className="signups-summary__table">
                <thead><tr><th>#</th><th>Contact</th><th>Data înscriere</th><th>Obiective</th><th>Date opționale</th><th>Acțiuni</th></tr></thead>
                <tbody>
                  {filteredEntries.map((entry, i) => (
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
                          <Button className="signups-summary__delete-btn" mode="default" tone="critical" text={deletingEntryId === entry._id ? 'Se șterge…' : 'Șterge'} onClick={() => deleteEntry(entry._id)} disabled={deletingEntryId === entry._id || isDeletingAll} />
                        </Flex>
                      </td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>
                        {searchQuery || selectedObjectiveCode ? 'Niciun rezultat pentru filtrele curente.' : 'Nicio înscriere.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
            <Flex className="signups-summary__footer-cell" align="center" justify="space-between" gap={2}>
              <Text size={1}>Afișate: {filteredEntries.length} din {signupEntries.length} înscrieri</Text>
              <Button
                className="signups-summary__delete-btn"
                mode="default"
                tone="critical"
                text={isDeletingAll ? 'Se șterg toate…' : 'Șterge toate'}
                onClick={deleteAll}
                disabled={isDeletingAll || filteredEntries.length === 0 || isLoading}
              />
            </Flex>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
