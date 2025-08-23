// sanity/components/contact-input.tsx
import React from "react"
import { ObjectInputProps, set, PatchEvent } from "sanity"
import { Flex, Box, Label, Stack, Text } from "@sanity/ui"
import styles from "./contact-oar-input.module.scss"

// The value shape for your object
interface ContactFieldsValue {
  address?: string
  contactEmail?: string
  contactPhone?: string
  contactEmailForms?: string
}

export default function ContactInput(
  props: ObjectInputProps<ContactFieldsValue>
) {
  const { value = {}, onChange, schemaType } = props

  // Cast helper so TS won’t complain about title, description, placeholder
  type FieldMeta = {
    title?: string
    description?: string
    placeholder?: string
  }
  const getFieldMeta = (fieldName: string): FieldMeta =>(schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta) || {}
  const handleChange = (fieldName: keyof ContactFieldsValue, fieldValue: string) => {onChange(PatchEvent.from(set(fieldValue, [fieldName])))}

  return (
    <Flex className={styles["namespace-container"]} >
      
      {/* ADDRESS */}
      <Box className="box"><Stack>
        <Label className="label">{getFieldMeta("address").title}</Label>
        {getFieldMeta("address").description && (<Text  muted>{getFieldMeta("address").description}</Text>)}
        <input type="text" placeholder={getFieldMeta("address").placeholder} value={value.address || ""} onChange={(e) => handleChange("address", e.target.value)}/>
      </Stack></Box>

      {/* CONTACT EMAIL */}
      <Box className="box"><Stack >
        <Label className="label">{getFieldMeta("contactEmail").title}</Label>
        {getFieldMeta("contactEmail").description && (<Text muted>{getFieldMeta("contactEmail").description}</Text>)}
        <input type="email" placeholder={getFieldMeta("contactEmail").placeholder} value={value.contactEmail || ""} onChange={(e) => handleChange("contactEmail", e.target.value)}/>
      </Stack></Box>

      {/* CONTACT PHONE */}
      <Box className="box"><Stack>
        <Label className="label">{getFieldMeta("contactPhone").title}</Label>
        {getFieldMeta("contactPhone").description && (<Text size={1} muted>{getFieldMeta("contactPhone").description}</Text>)}
        <input type="tel" placeholder={getFieldMeta("contactPhone").placeholder} value={value.contactPhone || ""} onChange={(e) => handleChange("contactPhone", e.target.value)}/>
      </Stack></Box>

      {/* CONTACT EMAIL FORMS */}
      <Box className="box"><Stack>
        <Label className="label">{getFieldMeta("contactEmailForms").title}</Label>
        {getFieldMeta("contactEmailForms").description && (<Text size={1} muted>{getFieldMeta("contactEmailForms").description}</Text>)}
        <input type="email" placeholder={getFieldMeta("contactEmailForms").placeholder} value={value.contactEmailForms || ""} onChange={(e) => handleChange("contactEmailForms", e.target.value)}/>
      </Stack></Box>

    </Flex>
  )
}
