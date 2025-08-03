// deskStructure.ts
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
                  .filter('_type == $type && metadata.year == $year && metadata.section != "null"')
                  .params({ type, year })
                  .defaultOrdering([
                    { field: 'metadata.section', direction: 'asc' },
                    { field: 'metadata.index', direction: 'asc' },
                  ])
              )
          )
        )
    )
}

function buildUncategorizedListItems(S: StructureBuilder) {
  return DOCUMENT_SCHEMAS.map((type) =>
    S.listItem()
      .title(`${getSchemaTitle(type)} (Neîncadrate)`)
      .child(
        S.documentList()
          .title(`${getSchemaTitle(type)} (Neîncadrate)`)
          .schemaType(type)
          .filter('_type == $type && (!defined(metadata) || !defined(metadata.year) || !defined(metadata.section) || metadata.section == "null")')
          .params({ type })
      )
  )
}

export default function deskStructure(S: StructureBuilder) {
  return S.list()
    .title('Content')
    .items([
      
      ...S.documentTypeListItems().filter(item => !DOCUMENT_SCHEMAS.includes(item.getId() as string)),
      S.divider(),
      // Uncategorized group
      ...buildUncategorizedListItems(S),
      S.divider(),
      ...YEARS.map((year) => buildYearList(S, year))
      
    ])
}
