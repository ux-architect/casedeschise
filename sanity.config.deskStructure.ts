import { StructureBuilder } from 'sanity/structure'
import { getSchemaTitle } from './schemaTypes'

const singletonId_generalInfo = '6c8bd2f5-2f82-4863-a435-f7a8946d69cf';
const singletonId_faqList = '38ee018f-cb08-48d8-a23a-ed0a3bb9f9cc';


const DOCUMENT_SCHEMAS_GROUPED_BY_YEAR = [
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
          DOCUMENT_SCHEMAS_GROUPED_BY_YEAR.map((type) =>
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
  return DOCUMENT_SCHEMAS_GROUPED_BY_YEAR.map((type) => {
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

      // Singleton: General Info
      S.listItem().title('Setări Website').id(singletonId_generalInfo)
        .child(S.document().schemaType('general-info').documentId(singletonId_generalInfo) ), // fixed ID

      // Singleton: Faq List
      S.listItem().title('FAQs').id(singletonId_faqList)
      .child(S.document().schemaType('faq').documentId(singletonId_faqList)), // fixed ID


    
      ...S.documentTypeListItems()
        .filter(item => !DOCUMENT_SCHEMAS_GROUPED_BY_YEAR.includes(item.getId() as string)) // hides DOCUMENT_SCHEMAS_GROUPED_BY_YEAR
        .filter(item => item.getId() !== 'media.tag') // 👈 hides "Media Tag"
        .filter(item => item.getId() !== "general-info")
        .filter(item => item.getId() !== "faq"), // 👈 hides "general-info" singleton from here
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