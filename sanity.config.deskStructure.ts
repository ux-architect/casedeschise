import { StructureBuilder } from 'sanity/structure'
import { getSchemaTitle } from './schemaTypes'

const DOCUMENT_SCHEMAS = [
  'projects-sibiu',
  'projects-valcea',
  'tours-sibiu',
  'tours-valcea',
  'events-sibiu',
  'events-valcea'
]

const SCHEMAS_WITH_SECTION = [
  'projects-sibiu',
  'projects-valcea'
]

const YEARS = ['2024', '2025', '2026']

function buildYearList(S: StructureBuilder, year: string) {
  return S.listItem()
    .title(year)
    .child(
      S.list()
        .title(year)
        .items(
          DOCUMENT_SCHEMAS.map((type) =>
            S.listItem()
              .title(`${getSchemaTitle(type)} (${year})`)
              .child(
                S.documentList()
                  .title(`${getSchemaTitle(type)} (${year})`)
                  .schemaType(type)
                  .filter('_type == $type && metadata.year == $year')
                  .params({ type, year })
                  .defaultOrdering([
                    { field: 'metadata.section', direction: 'asc' },
                    { field: 'metadata.index', direction: 'asc' }
                  ])
              )
          )
        )
    )
}

function buildUncategorizedListItems(S: StructureBuilder) {
  return DOCUMENT_SCHEMAS.map((type) => {
    const hasSection = SCHEMAS_WITH_SECTION.includes(type)

    // Different filter depending on schema
    const filterWithSection = `_type == $type && (
      !defined(metadata) ||
      !defined(metadata.year) || metadata.year == null || metadata.year == "" ||
      !defined(metadata.section) || metadata.section == null || metadata.section == "" || metadata.section == "null"
    )`

    const filterWithoutSection = `_type == $type && (
      !defined(metadata) ||
      !defined(metadata.year) || metadata.year == null || metadata.year == ""
    )`

    return S.listItem()
      .title(`${getSchemaTitle(type)} (Neîncadrate)`)
      .child(
        S.documentList()
          .title(`${getSchemaTitle(type)} (Neîncadrate)`)
          .schemaType(type)
          .filter(hasSection ? filterWithSection : filterWithoutSection)
          .params({ type })
      )
  })
}

export default function deskStructure(S: StructureBuilder) {
  return S.list()
    .title('Content')
    .items([
      // Everything else not in DOCUMENT_SCHEMAS
      ...S.documentTypeListItems().filter(item => !DOCUMENT_SCHEMAS.includes(item.getId() as string)&&
          item.getId() !== 'media.tag'), // 👈 hides "Media Tag"
      S.divider(),

      

      // Year groups
      ...YEARS.map((year) => buildYearList(S, year)),
      S.divider(),

      // Neîncadrate (grouped)
      S.listItem()
        .title('Neîncadrate')
        .child(
          S.list()
            .title('Neîncadrate')
            .items(buildUncategorizedListItems(S))
        ),

      
    ])
}