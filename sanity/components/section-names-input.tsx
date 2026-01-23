
import { ObjectInputProps, set, PatchEvent } from "sanity"
import { Flex, Box, Label, Stack, Text } from "@sanity/ui"
import "./section-names-input.scss"


// The value shape for your object
interface EditionFieldsValue {
year?: string
s1_sibiu?: string
s2_sibiu?: string
s3_sibiu?: string
s4_sibiu?: string
s1_valcea?: string
s2_valcea?: string
s3_valcea?: string
s4_valcea?: string
}


export default function SectionNamesInput(
props: ObjectInputProps<EditionFieldsValue>
) {
const { value = {}, onChange, schemaType } = props


// Cast helper so TS won’t complain about title, description, placeholder
type FieldMeta = {
title?: string
description?: string
placeholder?: string
}
const getFieldMeta = (fieldName: string): FieldMeta =>
(schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta) || {}


const handleChange = (
fieldName: keyof EditionFieldsValue,
fieldValue: string
) => {
onChange(PatchEvent.from(set(fieldValue, [fieldName])))
}


return (
<Flex className={'nsc--section-names-input'} >
  {/* YEAR */}
  <Label className="label-large" style={{ marginTop: 0 }}>{getFieldMeta("year").title}</Label>
  <Box className="box">
      <input type="text" placeholder={getFieldMeta("year").placeholder} value={value.year || ""} onChange={(e) => handleChange("year", e.target.value)}/>
  </Box>


  {/* SIBIU SECTIONS */}
  <Label className="label-large">SIBIU</Label>
  {(["s1_sibiu", "s2_sibiu", "s3_sibiu", "s4_sibiu"] as const).map(
    (field) => (
      <Box key={field} className="box">
          <Label className="label">{getFieldMeta(field).title}</Label>
          <input type="text" placeholder={getFieldMeta(field).placeholder} value={value[field] || ""} onChange={(e) => handleChange(field, e.target.value)}/>
      </Box>
    )
  )}


  {/* VALCEA SECTIONS */}
  <Label className="label-large">VALCEA</Label>
  {(["s1_valcea", "s2_valcea", "s3_valcea", "s4_valcea"] as const).map(
    (field) => (
    <Box key={field} className="box">
        <Label className="label">{getFieldMeta(field).title}</Label>
        <input type="text" placeholder={getFieldMeta(field).placeholder} value={value[field] || ""} onChange={(e) => handleChange(field, e.target.value)}/>
    </Box>
    )
  )}

  <Label className="label-large"></Label>

</Flex>
)
}