import { ObjectInputProps, set, PatchEvent } from "sanity"
import { Flex, Box, Label } from "@sanity/ui"
import "./signup-contact-input.scss"

interface SignupContactValue {
  name?: string
  email?: string
  phone?: string
}

export default function SignupContactInput(
  props: ObjectInputProps<SignupContactValue>
) {
  const { value = {}, onChange, schemaType } = props

  type FieldMeta = { title?: string; placeholder?: string }
  const getFieldMeta = (fieldName: string): FieldMeta =>
    (schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta) || {}

  const handleChange = (
    fieldName: keyof SignupContactValue,
    fieldValue: string
  ) => {
    onChange(PatchEvent.from(set(fieldValue, [fieldName])))
  }

  return (
    <Flex className="nsc--signup-contact-input">
      {(["email", "phone"] as const).map((field) => (
        <Box key={field} className="box">
          <Label className="label">{getFieldMeta(field).title || field}</Label>
          <input
            type="text"
            placeholder={getFieldMeta(field).placeholder}
            value={value[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </Box>
      ))}
    </Flex>
  )
}
