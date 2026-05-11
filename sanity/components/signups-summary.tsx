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
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [isDeletingChecked, setIsDeletingChecked] = useState(false)
  const [isDeletingAll, setIsDeletingAll] = useState(false)
  const [copyEmailsLabel, setCopyEmailsLabel] = useState('Copiază emailuri')
  const [copyPhonesLabel, setCopyPhonesLabel] = useState('Copiază telefoane')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [highlightDuplicates, setHighlightDuplicates] = useState(false)

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

      const haystack = [entry.contact?.name, entry.contact?.email, entry.contact?.phone, entry.optionalItems, formatObjectives(entry.objectives), entry.metadata?.year, formatDate(entry.details), formatDate(entry._createdAt)]
        .filter(Boolean).join(' ').toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [searchQuery, selectedObjectiveCode, signupEntries])

  const tsvText = useMemo(() => {
    const header = ['An', 'Nume', 'Email', 'Telefon', 'Data înscriere', 'Obiective', 'Date opționale', 'Creat la'].join('\t')
    const rows = filteredEntries.map((entry) =>
      [
        toTsvCell(entry.metadata?.year),
        toTsvCell(entry.contact?.name),
        toTsvCell(entry.contact?.email),
        toTsvCell(entry.contact?.phone),
        toTsvCell(formatDate(entry.details)),
        toTsvCell(formatObjectives(entry.objectives)),
        toTsvCell(entry.optionalItems),
        toTsvCell(formatDate(entry._createdAt)),
      ].join('\t')
    )
    return [header, ...rows].join('\n')
  }, [filteredEntries])

  const filteredEntryIds = useMemo(() => filteredEntries.map((entry) => entry._id), [filteredEntries])

  const optionalItemCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredEntries.forEach((entry) => {
      if (!entry.optionalItems) return
      entry.optionalItems.split(';').forEach((item) => {
        const trimmed = item.trim()
        if (trimmed) counts[trimmed] = (counts[trimmed] || 0) + 1
      })
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [filteredEntries])

  const duplicateEmails = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredEntries.forEach((e) => {
      const email = e.contact?.email?.trim().toLowerCase()
      if (email) counts[email] = (counts[email] || 0) + 1
    })
    return new Set(Object.keys(counts).filter((k) => counts[k] > 1))
  }, [filteredEntries])

  const filteredEmails = useMemo(() => {
    const emails = filteredEntries
      .map((e) => e.contact?.email?.trim())
      .filter((e): e is string => !!e)
    return [...new Set(emails)]
  }, [filteredEntries])

  const filteredPhones = useMemo(() => {
    const phones = filteredEntries
      .map((e) => e.contact?.phone?.trim())
      .filter((e): e is string => !!e)
    return [...new Set(phones)]
  }, [filteredEntries])

  const handleCopyEmails = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(filteredEmails.join(', '))
      setCopyEmailsLabel(`Copiat! (${filteredEmails.length})`)
      setTimeout(() => setCopyEmailsLabel('Copiază emailuri'), 2000)
    } catch {
      setErrorMessage('Copierea emailurilor a eșuat.')
    }
  }, [filteredEmails])

  const handleCopyPhones = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(filteredPhones.join(', '))
      setCopyPhonesLabel(`Copiat! (${filteredPhones.length})`)
      setTimeout(() => setCopyPhonesLabel('Copiază telefoane'), 2000)
    } catch {
      setErrorMessage('Copierea telefoanelor a eșuat.')
    }
  }, [filteredPhones])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tsvText)
      setShowExportMenu(false)
    } catch {
      setErrorMessage('Copierea automată a eșuat. Selectează textul și copiază manual.')
    }
  }, [tsvText])

  const toggleCheck = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleCheckAll = useCallback(() => {
    setCheckedIds((prev) => {
      const allFilteredIds = filteredEntries.map((e) => e._id)
      const allChecked = allFilteredIds.length > 0 && allFilteredIds.every((id) => prev.has(id))
      if (allChecked) return new Set()
      return new Set(allFilteredIds)
    })
  }, [filteredEntries])

  const deleteChecked = useCallback(async () => {
    const idsToDelete = Array.from(checkedIds)
    if (idsToDelete.length === 0) return

    const confirmed = window.confirm(`Sigur vrei să ștergi cele ${idsToDelete.length} înscrieri selectate?`)
    if (!confirmed) return

    try {
      setIsDeletingChecked(true)
      setErrorMessage(null)

      const tx = client.transaction()
      idsToDelete.forEach((id) => tx.delete(id))
      await tx.commit()

      const deleted = new Set(idsToDelete)
      setSignupEntries((prev) => prev.filter((entry) => !deleted.has(entry._id)))
      setCheckedIds(new Set())
    } catch {
      setErrorMessage('Ștergerea înscrierilor selectate a eșuat.')
    } finally {
      setIsDeletingChecked(false)
    }
  }, [client, checkedIds])

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
                <thead><tr><th style={{ width: 36, textAlign: 'center' }}><input type="checkbox" checked={filteredEntries.length > 0 && filteredEntries.every((e) => checkedIds.has(e._id))} onChange={toggleCheckAll} /></th><th>#</th><th>Contact</th><th>Data înscriere</th><th>Obiective</th><th>Date opționale</th></tr></thead>
                <tbody>
                  {filteredEntries.map((entry, i) => (
                    <tr key={entry._id}>
                      <td style={{ textAlign: 'center' }}><input type="checkbox" checked={checkedIds.has(entry._id)} onChange={() => toggleCheck(entry._id)} /></td>
                      <td className="signups-summary__cell--num">{i + 1}</td>
                      <td className="signups-summary__cell--contact">
                        {entry.contact?.name && <span>{entry.contact.name}</span>}
                        {entry.contact?.email && <span style={highlightDuplicates && duplicateEmails.has(entry.contact.email.trim().toLowerCase()) ? { color: 'var(--card-badge-critical-fg-color)', fontWeight: 600 } : undefined}>{entry.contact.email}</span>}
                        {entry.contact?.phone && <span>{entry.contact.phone}</span>}
                      </td>
                      <td>{formatDate(entry.details)}</td>
                      <td className="signups-summary__cell--objectives">{formatObjectives(entry.objectives)}</td>
                      <td className="signups-summary__cell--optional">{entry.optionalItems}</td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '1rem' }}>
                        {searchQuery || selectedObjectiveCode ? 'Niciun rezultat pentru filtrele curente.' : 'Nicio înscriere.'}
                      </td>
                    </tr>
                  )}
                </tbody>
                {optionalItemCounts.length > 0 && (
                  <tfoot className="signups-summary__optional-summary">
                    <tr><td colSpan={7} style={{ fontWeight: 600, paddingTop: 12 }}>Rezumat opționale:</td></tr>
                    {optionalItemCounts.map(([value, count]) => (
                      <tr key={value}>
                        <td colSpan={5} style={{ textAlign: 'right', color: 'var(--card-muted-fg-color)' }}>{value}</td>
                        <td style={{ fontWeight: 600 }}>{count}</td>
                      </tr>
                    ))}
                  </tfoot>
                )}
              </table>
            </Box>
            <Flex className="signups-summary__footer-cell" align="center" justify="space-between" gap={2}>
              <Text size={1}>Afișate: {filteredEntries.length} din {signupEntries.length} înscrieri</Text>
              <Flex gap={2} align="center">
                <Flex as="label" align="center" gap={2} style={{ cursor: duplicateEmails.size === 0 ? 'default' : 'pointer', opacity: duplicateEmails.size === 0 ? 0.4 : 1, marginRight: 12 }}>
                  <input type="checkbox" checked={highlightDuplicates} onChange={() => setHighlightDuplicates((v) => !v)} disabled={duplicateEmails.size === 0} style={highlightDuplicates ? { accentColor: 'var(--card-badge-critical-fg-color)' } : undefined} />
                  <Text size={1} muted>Vezi duplicate (email)</Text>
                </Flex>
                <Box style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Button
                    mode="ghost"
                    text="Copiază ▾"
                    onClick={() => setShowExportMenu((v) => !v)}
                    disabled={filteredEntries.length === 0}
                  />
                  {showExportMenu && (
                    <Box style={{ position: 'absolute', bottom: '100%', right: 0, marginBottom: 4, background: 'var(--card-bg-color)', border: '1px solid var(--card-border-color)', borderRadius: 3, zIndex: 10, minWidth: 200, padding: '6px 4px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button style={{ width: '100%' }} mode="bleed" text={copyEmailsLabel} onClick={handleCopyEmails} disabled={filteredEmails.length === 0} />
                      <Button style={{ width: '100%' }} mode="bleed" text={copyPhonesLabel} onClick={handleCopyPhones} disabled={filteredPhones.length === 0} />
                      <Button style={{ width: '100%' }} mode="bleed" text="Copiază înregistrări in format TSV (paste in excel)" onClick={handleCopy} />
                      <Text size={1} muted style={{ display: 'flex', padding: '12px 12px 10px', borderTop: '1px solid var(--card-border-color)', paddingTop: 12, textAlign: 'center', lineHeight: '1.4', opacity: 0.5 }}>Se copiază doar înregistrările unice vizibile (filtrate) din tabel</Text>
                    </Box>
                  )}
                </Box>
                <Button
                  className="signups-summary__delete-btn"
                  mode="default"
                  tone="critical"
                  text={isDeletingChecked ? 'Se șterg…' : `Șterge selectate (${checkedIds.size})`}
                  onClick={deleteChecked}
                  disabled={isDeletingChecked || isDeletingAll || checkedIds.size === 0}
                />
                <Button
                  className="signups-summary__delete-btn"
                  mode="default"
                  tone="critical"
                  text={isDeletingAll ? 'Se șterg toate…' : 'Șterge toate'}
                  onClick={deleteAll}
                  disabled={isDeletingAll || isDeletingChecked || filteredEntries.length === 0 || isLoading}
                />
              </Flex>
            </Flex>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
