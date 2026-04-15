import { useEffect, useMemo, useState } from 'react'
import { Box, Card, Stack, Text } from '@sanity/ui'
import { useClient } from 'sanity'
import './signups-overview.scss'

type SignupObjective = { _key?: string; status?: number }

type SignupEntry = {
  _id: string
  objectives?: SignupObjective[]
}

type SignupFormProject = { code?: string; name?: string }

type SignupFormProjectsResponse = {
  s1_title?: string
  s2_title?: string
  s3_title?: string
  s1_projects?: SignupFormProject[]
  s2_projects?: SignupFormProject[]
  s3_projects?: SignupFormProject[]
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
          `*[_type == $schemaType]{ _id, objectives[]{ _key, status } }`,
          { schemaType }
        )

        const signupFormType = schemaType.includes('sibiu')
          ? 'signup-form-sibiu'
          : schemaType.includes('valcea')
            ? 'signup-form-valcea'
            : null

        if (signupFormType) {
          const signupFormData = await client.fetch<SignupFormProjectsResponse>(
            `*[_type == $signupFormType][0]{ s1_title, s2_title, s3_title, s1_projects[]{ code, name }, s2_projects[]{ code, name }, s3_projects[]{ code, name } }`,
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
          if (mounted) {
            setObjectiveLabelByCode(labelsByCode)
            setObjectiveSectionByCode(sectionByCode)
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

  const sectionOrder = ['s1', 's2', 's3', 'other']
  const groupedSections = useMemo(() => {
    const groups: Record<string, ObjectiveRow[]> = { s1: [], s2: [], s3: [], other: [] }
    for (const row of rows) {
      const section = objectiveSectionByCode[row.code] || 'other'
      ;(groups[section] || groups.other).push(row)
    }
    return sectionOrder
      .filter((s) => groups[s].length > 0)
      .map((s) => ({ key: s, title: sectionTitles[s] || s, rows: groups[s] }))
  }, [rows, objectiveSectionByCode, sectionTitles])

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
                          <td><strong>Subtotal</strong></td>
                          <td className="signups-overview__cell--num"><strong>{sectionTotal}</strong></td>
                          <td className="signups-overview__cell--num"><strong>{sectionValidated}</strong></td>
                        </tr>
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
