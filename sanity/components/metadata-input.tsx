// sanity/components/metadata-input.tsx

import { ObjectInputProps, set, PatchEvent } from "sanity"
import { Flex, Box, Label, Stack } from "@sanity/ui"
import './metadata-input.scss';

interface MetadataValue {
  year?: string
  section?: string
  index?: string
}

export default function HorizontalMetadataInput(
  props: ObjectInputProps<MetadataValue>
) {
  const { value = {}, onChange, schemaType } = props

  // Helper for type safety for select field options
  type Option = { title: string; value: string }
  const sectionOptions =
    (schemaType.fields.find(f => f.name === "section")?.type.options?.list as Option[]) ||
    []

  const handleChange = (fieldName: keyof MetadataValue, fieldValue: string) => {
    onChange(PatchEvent.from(set(fieldValue, [fieldName])))
  }

  return (
    <Flex gap={3} className={`nsc--metadata-input`} style={{ maxWidth: "100%", marginBottom: 8 }}>

      {/* YEAR */}
      <Box flex={1} className="col col-1">
        <Stack space={2}>
          <Label size={1} className="label">{schemaType.fields[0].type.title}</Label>
          <input type="text" value={value.year || ""} onChange={e => handleChange("year", e.target.value)}/>
        </Stack>
      </Box>

      {/* SECTION */}
      <Box flex={1} className="col col-2">
        <Stack space={2}>
          <Label size={1} className="label">{schemaType.fields[1].type.title}</Label>
          <select  value={value.section || ""} onChange={e => handleChange("section", e.target.value)}>
            {sectionOptions.map(item => (
              <option key={item.value} value={item.value}>{item.title}</option>
            ))}
          </select>
        </Stack>
      </Box>

      {/* INDEX */}
      <Box flex={1} className="col col-3">
        <Stack space={2}>
          <Label size={1} className="label">{schemaType.fields[2].type.title}</Label>
          <input type="text" value={value.index || ""} onChange={e => handleChange("index", e.target.value)} />
        </Stack>
      </Box>

    </Flex>
  )
}