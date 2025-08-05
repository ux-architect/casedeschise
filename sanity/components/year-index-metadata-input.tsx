// sanity/components/metadata-input.tsx

import React from "react"
import { ObjectInputProps, set, PatchEvent } from "sanity"
import { Flex, Box, Label, Stack } from "@sanity/ui"
import styles from './metadata-input.module.scss';

interface MetadataValue {
  year?: string
  index?: string
}

export default function YearIndexMetadataInput(
  props: ObjectInputProps<MetadataValue>
) {
  const { value = {}, onChange, schemaType } = props

  // Helper for type safety for select field options


  const handleChange = (fieldName: keyof MetadataValue, fieldValue: string) => {
    onChange(PatchEvent.from(set(fieldValue, [fieldName])))
  }

  return (
    <Flex gap={3} className={`${styles['namespace-container']} `}style={{ maxWidth: "100%", marginBottom: 8 }}>

      {/* YEAR */}
      <Box flex={1} className="col col-1">
        <Stack space={2}>
          <Label size={1} className="label">{schemaType.fields[0].type.title}</Label>
          <input type="text" value={value.year || ""} onChange={e => handleChange("year", e.target.value)}/>
        </Stack>
      </Box>

      {/* INDEX */}
      <Box flex={1} className="col col-2">
        <Stack space={2}>
          <Label size={1} className="label">{schemaType.fields[1].type.title}</Label>
          <input type="text" value={value.index || ""} onChange={e => handleChange("index", e.target.value)} />
        </Stack>
      </Box>

    </Flex>
  )
}