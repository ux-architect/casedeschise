import { useEffect, useMemo, useState } from 'react'
import { Box, Card, Stack, Text } from '@sanity/ui'
import { useClient } from 'sanity'
import './signups-overview.scss'

type SignupObjective = { _key?: string; status?: number }

type SignupEntry = {
  _id: string
  objectives?: SignupObjective[]
  optionalItems?: string
}

type SignupFormProject = { code?: string; name?: string }

type SignupFormCheckbox = { checkboxCode?: string; checkboxLabel?: string }

type SignupFormProjectsResponse = {
  s1_title?: string
  s2_title?: string
  s3_title?: string
  s1_projects?: SignupFormProject[]
  s2_projects?: SignupFormProject[]
  s3_projects?: SignupFormProject[]
  s1_optionalItems?: { checkboxes?: SignupFormCheckbox[] }
  s2_optionalItems?: { checkboxes?: SignupFormCheckbox[] }
  s3_optionalItems?: { checkboxes?: SignupFormCheckbox[] }
}

type ObjectiveRow = {
  code: string
  name: string
  totalSignups: number
  validatedSignups: number
}

export default function SignupsOverview({ schemaType, title }: { schemaType: string; title: string }) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [signupEntries, setSignupEntries] = useState<SignupEntry[]>([])
  const [objectiveLabelByCode, setObjectiveLabelByCode] = useState<Record<string, string>>({})
  const [objectiveSectionByCode, setObjectiveSectionByCode] = useState<Record<string, string>>({})
  const [optionalItemLabelByCode, setOptionalItemLabelByCode] = useState<Record<string, string>>({})
  const [optionalItemSectionByCode, setOptionalItemSectionByCode] = useState<Record<string, string>>({})
  const [sectionTitles, setSectionTitles] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        setIsLoading(true)
        setErrorMessage(null)

        const entriesData = await client.fetch<SignupEntry[]>(
          `*[_type == $schemaType]{ _id, objectives[]{ _key, status }, optionalItems }`,
          { schemaType }
        )

        const signupFormType = schemaType.includes('sibiu')
          ? 'signup-form-sibiu'
          : schemaType.includes('valcea')
            ? 'signup-form-valcea'
            : null

        if (signupFormType) {
          const signupFormData = await client.fetch<SignupFormProjectsResponse>(
            `*[_type == $signupFormType][0]{ s1_title, s2_title, s3_title, s1_projects[]{ code, name }, s2_projects[]{ code, name }, s3_projects[]{ code, name }, s1_optionalItems{ checkboxes[]{ checkboxCode, checkboxLabel } }, s2_optionalItems{ checkboxes[]{ checkboxCode, checkboxLabel } }, s3_optionalItems{ checkboxes[]{ checkboxCode, checkboxLabel } } }`,
            { signupFormType }
          )
          const allProjects = [
            ...(signupFormData?.s1_projects || []),
            ...(signupFormData?.s2_projects || []),
            ...(signupFormData?.s3_projects || []),
          ]
          const labelsByCode: Record<string, string> = {}
          const sectionByCode: Record<string, string> = {}
          const mapProjects = (projects: SignupFormProject[], section: string) => {
            projects.forEach((project) => {
              const code = (project.code || '').trim()
              const name = (project.name || '').trim()
              if (code && name) labelsByCode[code] = name
              if (code) sectionByCode[code] = section
            })
          }
          mapProjects(signupFormData?.s1_projects || [], 's1')
          mapProjects(signupFormData?.s2_projects || [], 's2')
          mapProjects(signupFormData?.s3_projects || [], 's3')

          const optLabels: Record<string, string> = {}
          const optSections: Record<string, string> = {}
          const mapCheckboxes = (checkboxes: SignupFormCheckbox[], section: string) => {
            checkboxes.forEach((cb) => {
              const code = (cb.checkboxCode || '').trim()
              const label = (cb.checkboxLabel || '').trim()
              if (code) {
                optLabels[code] = label || code
                optSections[code] = section
              }
              if (label && label !== code) {
                optLabels[label] = label
                optSections[label] = section
              }
            })
          }
          mapCheckboxes(signupFormData?.s1_optionalItems?.checkboxes || [], 's1')
          mapCheckboxes(signupFormData?.s2_optionalItems?.checkboxes || [], 's2')
          mapCheckboxes(signupFormData?.s3_optionalItems?.checkboxes || [], 's3')

          if (mounted) {
            setObjectiveLabelByCode(labelsByCode)
            setObjectiveSectionByCode(sectionByCode)
            setOptionalItemLabelByCode(optLabels)
            setOptionalItemSectionByCode(optSections)
            setSectionTitles({
              s1: signupFormData?.s1_title || 'Secțiunea 1',
              s2: signupFormData?.s2_title || 'Secțiunea 2',
              s3: signupFormData?.s3_title || 'Secțiunea 3',
              other: 'Altele',
            })
          }
        } else if (mounted) {
          setObjectiveLabelByCode({})
          setObjectiveSectionByCode({})
          setOptionalItemLabelByCode({})
          setOptionalItemSectionByCode({})
          setSectionTitles({})
        }

        if (mounted) setSignupEntries(entriesData || [])
      } catch {
        if (mounted) setErrorMessage('Nu am putut încărca datele.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadData()
    return () => { mounted = false }
  }, [client, schemaType])

  const rows: ObjectiveRow[] = useMemo(() => {
    const totals: Record<string, { total: number; validated: number }> = {}

    for (const entry of signupEntries) {
      for (const objective of entry.objectives || []) {
        const code = (objective._key || '').trim()
        if (!code) continue
        if (!totals[code]) totals[code] = { total: 0, validated: 0 }
        totals[code].total += 1
        if (objective.status === 2) totals[code].validated += 1
      }
    }

    return Object.entries(totals)
      .map(([code, counts]) => ({
        code,
        name: objectiveLabelByCode[code] || code,
        totalSignups: counts.total,
        validatedSignups: counts.validated,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'ro'))
  }, [signupEntries, objectiveLabelByCode])

  const optionalItemRows = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const entry of signupEntries) {
      if (!entry.optionalItems) continue
      entry.optionalItems.split(';').forEach((item) => {
        const trimmed = item.trim()
        if (trimmed) counts[trimmed] = (counts[trimmed] || 0) + 1
      })
    }
    return Object.entries(counts).map(([code, total]) => {
      const label = optionalItemLabelByCode[code]
      const displayName = label && label !== code ? `${label} (${code})` : code
      return { code, name: displayName, total }
    })
  }, [signupEntries, optionalItemLabelByCode])

  const sectionOrder = ['s1', 's2', 's3', 'other']
  const groupedSections = useMemo(() => {
    const groups: Record<string, ObjectiveRow[]> = { s1: [], s2: [], s3: [], other: [] }
    for (const row of rows) {
      const section = objectiveSectionByCode[row.code] || 'other'
      ;(groups[section] || groups.other).push(row)
    }
    return sectionOrder
      .filter((s) => groups[s].length > 0)
      .map((s) => ({
        key: s,
        title: sectionTitles[s] || s,
        rows: groups[s],
        optionalRows: optionalItemRows.filter((o) => (optionalItemSectionByCode[o.code] || 'other') === s),
      }))
  }, [rows, objectiveSectionByCode, sectionTitles, optionalItemRows, optionalItemSectionByCode])

  const grandTotal = useMemo(() => rows.reduce((sum, r) => sum + r.totalSignups, 0), [rows])
  const grandValidated = useMemo(() => rows.reduce((sum, r) => sum + r.validatedSignups, 0), [rows])

  return (
    <Card padding={4} sizing="border" className="signups-overview">
      <Stack space={4}>
        <Text size={2} weight="semibold">{title}</Text>

        {isLoading && <Text size={1}>Se încarcă…</Text>}
        {errorMessage && <Text size={1} style={{ color: 'var(--card-badge-critical-fg-color)' }}>{errorMessage}</Text>}

        {!isLoading && !errorMessage && (
          <Stack space={4}>
            {groupedSections.map((section) => {
              const sectionTotal = section.rows.reduce((s, r) => s + r.totalSignups, 0)
              const sectionValidated = section.rows.reduce((s, r) => s + r.validatedSignups, 0)
              return (
                <Box key={section.key} className="signups-overview__table-panel">
                  {/* <Text size={1} weight="semibold" className="signups-overview__section-title">{section.title}</Text> */}
                  <Box className="signups-overview__table-wrap">
                    <table className="signups-overview__table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Obiectiv</th>
                          <th className="signups-overview__cell--num">Înscrieri</th>
                          <th className="signups-overview__cell--num">Validate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, i) => (
                          <tr key={row.code}>
                            <td className="signups-overview__cell--index">{i + 1}</td>
                            <td>{row.name}</td>
                            <td className="signups-overview__cell--num">{row.totalSignups}</td>
                            <td className="signups-overview__cell--num">{row.validatedSignups}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td></td>
                          <td><strong>Total</strong></td>
                          <td className="signups-overview__cell--num"><strong>{sectionTotal}</strong></td>
                          <td className="signups-overview__cell--num"><strong>{sectionValidated}</strong></td>
                        </tr>
                        {section.optionalRows.length > 0 && section.optionalRows.map((opt) => (
                          <tr key={opt.code} className="signups-overview__optional-row">
                            <td></td>
                            <td style={{ fontStyle: 'italic' }}>{opt.name}</td>
                            <td className="signups-overview__cell--num">{opt.total}</td>
                            <td></td>
                          </tr>
                        ))}
                      </tfoot>
                    </table>
                  </Box>
                </Box>
              )
            })}

            {rows.length > 0 && (
              <Box className="signups-overview__table-panel">
                <Box className="signups-overview__table-wrap">
                  <table className="signups-overview__table">
                    <tfoot>
                      <tr>
                        <td></td>
                        <td><strong>Total general</strong></td>
                        <td className="signups-overview__cell--num"><strong>{grandTotal}</strong></td>
                        <td className="signups-overview__cell--num"><strong>{grandValidated}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </Box>
              </Box>
            )}

            {rows.length === 0 && (
              <Text size={1} muted>Nicio înscriere.</Text>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
