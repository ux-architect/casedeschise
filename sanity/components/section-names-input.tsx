import React from "react"
import { ArrayOfObjectsInputProps, set, unset, PatchEvent, ObjectSchemaType } from "sanity"
import { Card, Flex, Box, Label, Stack, Text, Button } from "@sanity/ui"
import styles from "./section-names-input.module.scss"

interface SectionNamesValue {
  _key: string
  name?: string
  s1_sibiu?: string
  s2_sibiu?: string
  s3_sibiu?: string
  s4_sibiu?: string
  s1_valcea?: string
  s2_valcea?: string
  s3_valcea?: string
  s4_valcea?: string
}

export default function SectionNamesInput(props: ArrayOfObjectsInputProps<SectionNamesValue>) {
  const { value, onChange, schemaType } = props

  // Ensure value is always an array
  const safeValue: SectionNamesValue[] = Array.isArray(value) ? value : []

  // Safe access to the object type
  const objectType = schemaType.of?.[0] as ObjectSchemaType | undefined

  // Get field title, fallback to fieldName if objectType missing
  const getFieldTitle = (fieldName: string): string =>
    objectType?.fields.find((fld) => fld.name === fieldName)?.type.title || fieldName

  // Update a field in a specific item
  const handleChange = (index: number, fieldName: keyof SectionNamesValue, fieldValue: string) => {
    const newItem = { ...safeValue[index], [fieldName]: fieldValue }
    const newValue = [...safeValue]
    newValue[index] = newItem
    onChange(PatchEvent.from(set(newValue)))
  }

  // Add a new item with unique _key
  const handleAdd = () => {
    onChange(
      PatchEvent.from(
        set([
          ...safeValue,
          {
            _key: `${Date.now()}-${Math.random()}`,
            name: "",
            s1_sibiu: "",
            s2_sibiu: "",
            s3_sibiu: "",
            s4_sibiu: "",
            s1_valcea: "",
            s2_valcea: "",
            s3_valcea: "",
            s4_valcea: ""
          }
        ])
      )
    )
  }

  // Remove an item
  const handleRemove = (index: number) => {
    const newValue = [...safeValue]
    newValue.splice(index, 1)
    onChange(newValue.length > 0 ? PatchEvent.from(set(newValue)) : PatchEvent.from(unset()))
  }

  return (
    <Stack space={1} className={styles["namespace-container"]}>
      {safeValue.map((item, index) => (
        <Card key={item._key || index} border padding={4} radius={2} shadow={1}>
          <Stack space={3}>
            <Flex justify="space-between" align="center">
              <Label>Editie #{index + 1}</Label>
              <Button tone="critical" text="Remove" onClick={() => handleRemove(index)} />
            </Flex>

            {/* Name field */}
            <Box>
              <Label>{getFieldTitle("name")}</Label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </Box>

            {/* Sibiu fields */}
            <Text muted>Sibiu</Text>
            {["s1_sibiu", "s2_sibiu", "s3_sibiu", "s4_sibiu"].map((f) => (
              <Box key={f}>
                <Label>{getFieldTitle(f)}</Label>
                <input
                  type="text"
                  value={(item as any)[f] || ""}
                  onChange={(e) => handleChange(index, f as keyof SectionNamesValue, e.target.value)}
                />
              </Box>
            ))}

            {/* Vâlcea fields */}
            <Text muted>Vâlcea</Text>
            {["s1_valcea", "s2_valcea", "s3_valcea", "s4_valcea"].map((f) => (
              <Box key={f}>
                <Label>{getFieldTitle(f)}</Label>
                <input
                  type="text"
                  value={(item as any)[f] || ""}
                  onChange={(e) => handleChange(index, f as keyof SectionNamesValue, e.target.value)}
                />
              </Box>
            ))}
          </Stack>
        </Card>
      ))}

      <Button text="Add Editie" mode="ghost" tone="primary" onClick={handleAdd} />
    </Stack>
  )
}
