// sanity/components/contact-input.tsx
import { ObjectInputProps, set, PatchEvent } from "sanity"
import { Flex, Box, Label, Stack, Text } from "@sanity/ui"
import "./contact-oar-input.scss"

// The value shape for your object
interface ContactFieldsValue {
  city?: string
  address?: string
  contactEmail?: string
  contactPhone?: string
  contactEmailForms?: string
}

export default function ContactInput(
  props: ObjectInputProps<ContactFieldsValue>
) {
  const { value = {}, onChange, schemaType } = props

  // Cast helper so TS won’t complain about title, description, placeholder, hidden
  type FieldMeta = {
    title?: string
    description?: string
    placeholder?: string
    hidden?: boolean
  }
  const getFieldMeta = (fieldName: string): FieldMeta =>(schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta) || {}
  const isHidden = (fieldName: string) => (schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta)?.hidden === true
  const handleChange = (fieldName: keyof ContactFieldsValue, fieldValue: string) => {onChange(PatchEvent.from(set(fieldValue, [fieldName])))}

  return (
    <Flex className={'nsc--contact-oar-input'} 
    >
      <Text size={2} weight="semibold">{String(value.city)}</Text>

      {/* CITY */}
      {!isHidden("city") && (<Box className="box"><Stack>
        <Label className="label">{getFieldMeta("city").title}</Label>
        {getFieldMeta("city").description && (<Text  muted className="label">{getFieldMeta("city").description}</Text>)}
        <input type="text" placeholder={getFieldMeta("city").placeholder} value={value.city || ""} onChange={(e) => handleChange("city", e.target.value)}/>
      </Stack></Box>)}

      {/* ADDRESS */}
      {!isHidden("address") && (<Box className="box"><Stack>
        <Label className="label">{getFieldMeta("address").title}</Label>
        {getFieldMeta("address").description && (<Text  muted className="label">{getFieldMeta("address").description}</Text>)}
        <input type="text" placeholder={getFieldMeta("address").placeholder} value={value.address || ""} onChange={(e) => handleChange("address", e.target.value)}/>
      </Stack></Box>)}

      {/* CONTACT EMAIL */}
      {!isHidden("contactEmail") && (<Box className="box"><Stack >
        <Label className="label">{getFieldMeta("contactEmail").title}</Label>
        {getFieldMeta("contactEmail").description && (<Text muted className="label">{getFieldMeta("contactEmail").description}</Text>)}
        <input type="email" placeholder={getFieldMeta("contactEmail").placeholder} value={value.contactEmail || ""} onChange={(e) => handleChange("contactEmail", e.target.value)}/>
      </Stack></Box>)}

      {/* CONTACT PHONE */}
      {!isHidden("contactPhone") && (<Box className="box"><Stack>
        <Label className="label">{getFieldMeta("contactPhone").title}</Label>
        {getFieldMeta("contactPhone").description && (<Text muted className="label"> {getFieldMeta("contactPhone").description}</Text>)}
        <input type="tel" placeholder={getFieldMeta("contactPhone").placeholder} value={value.contactPhone || ""} onChange={(e) => handleChange("contactPhone", e.target.value)}/>
      </Stack></Box>)}

      {/* CONTACT EMAIL FORMS */}
      {!isHidden("contactEmailForms") && (<Box className="box mb-30"><Stack>
        <Label className="label">{getFieldMeta("contactEmailForms").title}</Label>
        {getFieldMeta("contactEmailForms").description && (<Text muted className="label">{getFieldMeta("contactEmailForms").description}</Text>)}
        <input type="email" placeholder={getFieldMeta("contactEmailForms").placeholder} value={value.contactEmailForms || ""} onChange={(e) => handleChange("contactEmailForms", e.target.value)}/>
      </Stack></Box>)}

    </Flex>
  )
}