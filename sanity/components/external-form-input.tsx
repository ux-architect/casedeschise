import React from "react";
import { ObjectInputProps, set, PatchEvent } from "sanity";
import { Flex, Box, Label, Stack, Text } from "@sanity/ui";
import styles from "./external-form-input.module.scss";

interface ExternalFormLinksValue {
  visitFormExternalUrl?: string;
  hostFormExternalUrl?: string;
  volunteerFormExternalUrl?: string;
  kidsWorkshopFormExternalUrl?: string;
}

export default function ExternalFormInput(
  props: ObjectInputProps<ExternalFormLinksValue>
) {
  const { value = {}, onChange, schemaType } = props;

  type FieldMeta = {
    [x: string]: any; title?: string; description?: string; placeholder?: string 
};
  const getFieldMeta = (fieldName: string): FieldMeta =>
    (schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta) || {};

  const handleChange = (
    fieldName: keyof ExternalFormLinksValue,
    fieldValue: string
  ) => onChange(PatchEvent.from(set(fieldValue, [fieldName])));

const fields: (keyof ExternalFormLinksValue)[] = [
  "visitFormExternalUrl",
  "hostFormExternalUrl",
  "volunteerFormExternalUrl",
  "kidsWorkshopFormExternalUrl"
];

return (
  <Flex className={styles["namespace-container"]}>
    {fields.map(fieldName => {
      const meta = getFieldMeta(fieldName);
      if (meta.hidden) return null; // skip hidden fields

      return (
        <Box className="box" key={fieldName}>
          <Stack>
            <Label className="label">{meta.title}</Label>
            {meta.description && <Text muted className="label">{meta.description}</Text>}
            <input
              type="url"
              placeholder={meta.placeholder}
              value={value[fieldName] || ""}
              onChange={(e) => handleChange(fieldName, e.target.value)}
            />
          </Stack>
        </Box>
      );
    })}
  </Flex>
);
}
