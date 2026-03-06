import { StructureBuilder } from 'sanity/structure'
import { getSchemaTitle } from './schemaTypes'
import SignupsSibiuSummary from './sanity/components/signups-sibiu-summary'

const singletonId_generalInfo = '6c8bd2f5-2f82-4863-a435-f7a8946d69cf';
const singletonId_faqList = '38ee018f-cb08-48d8-a23a-ed0a3bb9f9cc';

function yearSchema(S: StructureBuilder, year: string, type: string) {
  return S.listItem().title(`${getSchemaTitle(type)} (${year})`)
    .child(
      S.documentList().title(`${getSchemaTitle(type)} (${year})`).schemaType(type)
        .filter('_type == $type && metadata.year == $year')
        .params({ type, year })
        .defaultOrdering([
          { field: 'metadata.section', direction: 'asc' },
          { field: 'metadata.index', direction: 'asc' },
        ])
    )
}

function year2024(S: StructureBuilder) {
  return S.listItem().title('2024').child(
      S.list().title('2024')
        .items([
          yearSchema(S, '2024', 'projects-sibiu'),
          yearSchema(S, '2024', 'projects-valcea'),
          yearSchema(S, '2024', 'tours-sibiu'),
          yearSchema(S, '2024', 'tours-valcea'),
          yearSchema(S, '2024', 'events-sibiu'),
          yearSchema(S, '2024', 'events-valcea'),
        ])
    )
}

function year2025(S: StructureBuilder) {
  return S.listItem().title('2025').child(
      S.list().title('2025')
        .items([
          yearSchema(S, '2025', 'projects-sibiu'),
          yearSchema(S, '2025', 'projects-valcea'),
          yearSchema(S, '2025', 'tours-sibiu'),
          yearSchema(S, '2025', 'tours-valcea'),
          yearSchema(S, '2025', 'events-sibiu'),
          yearSchema(S, '2025', 'events-valcea'),
        ])
    )
}

function year2026(S: StructureBuilder) {
  return S.listItem().title('2026').child(
      S.list().title('2026')
        .items([
          yearSchema(S, '2026', 'projects-sibiu'),
          yearSchema(S, '2026', 'tours-sibiu'),
          yearSchema(S, '2026', 'events-sibiu'),S.divider(),

          yearSchema(S, '2026', 'projects-valcea'),
          yearSchema(S, '2026', 'tours-valcea'),
          yearSchema(S, '2026', 'events-valcea'),
          
          S.divider(),
          
          S.listItem().title('Formular înscrieri Sibiu (2026)')
            .child(S.document().title('înscrieri Sibiu').documentId('formular-sibiu-2026').schemaType('signup-form-sibiu')),

          S.listItem().title('Formular înscrieri Valcea (2026)')
            .child(S.document().title('înscrieri Valcea').documentId('formular-valcea-2026').schemaType('signup-form-valcea')),

          S.divider(),
          yearSchema(S, '2026', 'signups-sibiu'),
          yearSchema(S, '2026', 'signups-valcea'),

          // S.listItem().title('Sumar înscrieri Sibiu (copy/paste)')
          //   .child(S.component().title('Sumar înscrieri Sibiu').component(SignupsSibiuSummary)),
        ])
    )
}


function uncategorizedWithSection(S: StructureBuilder, type: string) {
  return S.listItem()
    .title(`${getSchemaTitle(type)} (Neîncadrate)`)
    .child(
      S.documentList().title(`${getSchemaTitle(type)} (Neîncadrate)`).schemaType(type)
        .filter('_type == $type && (!defined(metadata) || !defined(metadata.year) || metadata.year == "" || !defined(metadata.section) || metadata.section == "" || metadata.section == "null")')
        .params({ type })
    )
}

function uncategorizedWithoutSection(S: StructureBuilder,type: string) {
  return S.listItem()
    .title(`${getSchemaTitle(type)} (Neîncadrate)`)
    .child(
      S.documentList().title(`${getSchemaTitle(type)} (Neîncadrate)`).schemaType(type)
        .filter('_type == $type && (!defined(metadata) || !defined(metadata.year) || metadata.year == "")')
        .params({ type })
    )
}

export default function deskStructure(S: StructureBuilder) {
  return S.list()
    .title('Content')
    .items([

      // ─── Singletons ─────────────────────────────────────────────
      S.listItem()
        .title('Setări Website')
        .id(singletonId_generalInfo)
        .child(
          S.document()
            .schemaType('general-info')
            .documentId(singletonId_generalInfo)
        ),

      S.listItem()
        .title('FAQs')
        .id(singletonId_faqList)
        .child(
          S.document()
            .schemaType('faq')
            .documentId(singletonId_faqList)
        ),

      S.divider(),

      // ─── Default document types (filtered) ──────────────────────
      // ...S.documentTypeListItems()
      //   .filter(item =>
      //     ![
      //       'projects-sibiu',
      //       'projects-valcea',
      //       'tours-sibiu',
      //       'tours-valcea',
      //       'events-sibiu',
      //       'events-valcea',
      //       'signups-sibiu',
      //     ].includes(item.getId() as string)
      //   )
      //   .filter(item => item.getId() !== 'media.tag')
      //   .filter(item => item.getId() !== 'general-info')
      //   .filter(item => item.getId() !== 'faq'),

      // S.divider(),

      // ─── Years ──────────────────────────────────────────────────
      year2024(S),
      year2025(S),
      year2026(S),

      S.divider(),

      // ─── Neîncadrate ────────────────────────────────────────────
      S.listItem()
        .title('Neîncadrate')
        .child(
          S.list()
            .title('Neîncadrate')
            .items([
              uncategorizedWithSection(S, 'projects-sibiu'),
              uncategorizedWithSection(S, 'projects-valcea'),
              uncategorizedWithoutSection(S, 'tours-sibiu'),
              uncategorizedWithoutSection(S, 'tours-valcea'),
              uncategorizedWithoutSection(S, 'events-sibiu'),
              uncategorizedWithoutSection(S, 'events-valcea'),
              // uncategorizedWithoutSection(S, 'signups-sibiu'),
            ])
        ),
    ])
}