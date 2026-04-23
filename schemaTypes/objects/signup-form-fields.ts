import { defineType, defineField } from "sanity";

const portableTextToPlain = (blocks?: { children?: { text?: string }[] }[]) => {
  if (!blocks || blocks.length === 0) {
    return '';
  }

  return blocks
    .map((block) => (block.children || []).map((child) => child.text || '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const optionalTextsField = () =>
  defineField({
    name: 'texts',
    title: 'Paragrafe opționale',
    type: 'array',
    of: [
      {
        type: 'object', 
        name: 'text_item',
        title: 'Paragraf',
        fields: [{ name: 'text', title: 'Text', type: 'array', of: [{ type: 'block' }] }],
      },
    ],
  });

const optionalCheckboxesField = () =>
  defineField({
    name: 'checkboxes',
    title: 'Bife opționale',
    description: "secțiunea cu bife va fi activă doar când minim 1 proiect vizitabil e selectat",
    type: 'array',
    of: [{
      type: 'object',
      name: 'checkbox_item',
      title: 'Bifă',
      fields: [
        { name: 'infoText', title: 'Paragraf informativ bifă', description: "câmp opțional, vizibil doar dacă conține text", type: 'array', of: [{ type: 'block' }] },
        { name: 'checkboxLabel', title: 'Text bifă', type: 'string' },
        { name: 'checkboxCode', title: 'Cod bifă', type: 'string' },
      ],
      preview: {
        select: { checkboxLabel: 'checkboxLabel', checkboxCode: 'checkboxCode', infoText: 'infoText' },
        prepare({ checkboxLabel, checkboxCode, infoText }) {
          const infoTextPlain = portableTextToPlain(infoText as { children?: { text?: string }[] }[]);
          if (!checkboxLabel) {return { title: 'Bifă fără text' };}
          const codeStr = checkboxCode ? ` [${checkboxCode}]` : '';
          return {title: infoTextPlain ? `${checkboxLabel}${codeStr} (${infoTextPlain})` : `${checkboxLabel}${codeStr}`,};
        },
      },
    }],
  });

type SignupProjectsFieldConfig = { name: string; title: string; fieldset: "section1" | "section2" | "section3"; };

const signupProjectsField = ({ name, title, fieldset }: SignupProjectsFieldConfig) =>
  defineField({
    name,
    title,
    type: 'array',
    fieldset,
    of: [
      {
        type: 'object',
        fields: [
          { name: 'image', title: 'Imagine', description: "(dimensiune fixă: 500x330 px)", type: 'image', options: { hotspot: true } },
          { name: 'name', title: 'Nume', type: 'string' },
          { name: 'subtitle', title: 'Subtitlu (optional)', type: 'string' },
          { name: 'code', title: 'Cod', type: 'string', description: "cod unic, succint, (prefix sb- sau vl-) ex: sb-ca-file, vl-mu-arta", validation: (rule) => rule.required() },
          { name: 'info', title: 'Info data', description: "ar putea fi omis cuvantul 'deschis:'", type: 'string' },
          { name: 'address', title: 'Adresa', type: 'string' },
          { name: 'soldOut', title: 'Sold out', type: 'boolean' },
        ],
        preview: {
          select: { title: 'name', code: 'code', media: 'image' },
          prepare({ title, code, media }) {
            return { title: code ? `${title || ''} (${code})` : title || '', media }
          },
        },
      },
    ],
  });


export const signupForm_Fieldsets = [
  { name: "section1", title: "Secțiunea 1", options: { collapsible: true, collapsed: false } }, 
  { name: "section2", title: "Secțiunea 2", options: { collapsible: true, collapsed: false } },
  { name: "section3", title: "Secțiunea 3", options: { collapsible: true, collapsed: false } },
]

export const signupFormFields = [

    defineField({ name: "title", title: "Titlu formular", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "terms_conditions",
      title: "Termeni și condiții",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "terms_checkbox_label",
      title: "Text checkbox termeni",
      type: "string",
    }),
  
    // Section 1
    defineField({ name: "s1_title", title: "Titlu (s1)", type: "string", fieldset: "section1", }),
    defineField({
      name: "s1_subtitle",
      title: "Subtitlu (s1)",
      type: "array",
      fieldset: "section1",
      of: [{ type: "block" }],
    }),
    signupProjectsField({ name: 's1_projects', title: 'Obiective (s1)', fieldset: 'section1' }),

    defineField({
          name: 's1_optionalItems',
          title: 'Opționale (s1)',
          type: 'object',
          options: { collapsible: true, collapsed: true },
          fieldset: "section1",
          fields: [
            optionalTextsField(),
            optionalCheckboxesField(),
          ],  
    }),




    // Section 2 
    defineField({ name: "s2_title", title: "Titlu (s2)", type: "string",fieldset: "section2", }),
    defineField({
      name: "s2_subtitle",
      title: "Subtitlu (s2)",
      type: "array",
      fieldset: "section2",
      of: [{ type: "block" }],
    }),
    signupProjectsField({ name: 's2_projects', title: 'Obiective (s2)', fieldset: 'section2' }),

    defineField({
          name: 's2_optionalItems',
          title: 'Opționale (s2)',
          type: 'object',
          options: { collapsible: true, collapsed: true },
          fieldset: "section2",
          fields: [
            optionalTextsField(),
            optionalCheckboxesField(),
          ],
    }),

    // Section 3 
    defineField({ name: "s3_title", title: "Titlu (s3)", type: "string",fieldset: "section3", }),
    defineField({
      name: "s3_subtitle",
      title: "Subtitlu (s3)",
      type: "array",
      fieldset: "section3",
      of: [{ type: "block" }],
    }),
    signupProjectsField({ name: 's3_projects', title: 'Obiective (s3)', fieldset: 'section3' }),

    defineField({
          name: 's3_optionalItems',
          title: 'Opționale (s3)',
          type: 'object',
          options: { collapsible: true, collapsed: true },
          fieldset: "section3",
          fields: [
            optionalTextsField(),
            optionalCheckboxesField(),
          ],
    }),

    // Email template
    defineField({
      name: 'email_template',
      title: 'Email',
      type: 'text',
      rows: 14,
      description: 'Prima linie e titlul (subject); ** marcheaza text bold; Se poate modifica textul, ordinea secțiunilor, spatierea, dar nu variablilele tip ##nume_inscris##, sau delimitarile __________ si -----------',
      initialValue: `Înscriere Case Deschise ##year##\n\nSalut **##name##** !\n**Te-ai înscris la următoarele obiective:**\n##projects##\n##transport##\nAccesul la vizite în cadrul evenimentului se face prin prezentarea codului QR`,
    }),

  ];