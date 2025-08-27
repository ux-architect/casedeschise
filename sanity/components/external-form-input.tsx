// sanity/components/external-form-input.tsx
import React from "react";
import { ObjectInputProps, set, PatchEvent } from "sanity";
import { Flex, Box, Label, Stack, Text } from "@sanity/ui";
import styles from "./external-form-input.module.scss";

interface ExternalFormLinksValue {
  visitFormExternalUrl?: string;
  hostFormExternalUrl?: string;
  volunteerFormExternalUrl?: string;
}

export default function ExternalFormInput(
  props: ObjectInputProps<ExternalFormLinksValue>
) {
  const { value = {}, onChange, schemaType } = props;

  type FieldMeta = {
    title?: string;
    description?: string;
    placeholder?: string;
  };
  const getFieldMeta = (fieldName: string): FieldMeta =>
    (schemaType.fields.find((f) => f.name === fieldName)?.type as FieldMeta) || {};
  const handleChange = (
    fieldName: keyof ExternalFormLinksValue,
    fieldValue: string
  ) => {
    onChange(PatchEvent.from(set(fieldValue, [fieldName])));
  };

  return (
    <Flex className={styles["namespace-container"]}>

      {/* VISIT FORM */}
      <Box className="box"><Stack>
        <Label className="label">{getFieldMeta("visitFormExternalUrl").title}</Label>
        {getFieldMeta("visitFormExternalUrl").description && (
          <Text muted className="label">
            {getFieldMeta("visitFormExternalUrl").description}
          </Text>
        )}
        <input
          type="url"
          placeholder={getFieldMeta("visitFormExternalUrl").placeholder}
          value={value.visitFormExternalUrl || ""}
          onChange={(e) =>
            handleChange("visitFormExternalUrl", e.target.value)
          }
        />
      </Stack></Box>

      {/* HOST FORM */}
      <Box className="box"><Stack>
        <Label className="label">{getFieldMeta("hostFormExternalUrl").title}</Label>
        {getFieldMeta("hostFormExternalUrl").description && (
          <Text muted className="label">
            {getFieldMeta("hostFormExternalUrl").description}
          </Text>
        )}
        <input
          type="url"
          placeholder={getFieldMeta("hostFormExternalUrl").placeholder}
          value={value.hostFormExternalUrl || ""}
          onChange={(e) =>
            handleChange("hostFormExternalUrl", e.target.value)
          }
        />
      </Stack></Box>

      {/* VOLUNTEER FORM */}
      <Box className="box"><Stack>
        <Label className="label">{getFieldMeta("volunteerFormExternalUrl").title}</Label>
        {getFieldMeta("volunteerFormExternalUrl").description && (
          <Text muted className="label">
            {getFieldMeta("volunteerFormExternalUrl").description}
          </Text>
        )}
        <input
          type="url"
          placeholder={getFieldMeta("volunteerFormExternalUrl").placeholder}
          value={value.volunteerFormExternalUrl || ""}
          onChange={(e) =>
            handleChange("volunteerFormExternalUrl", e.target.value)
          }
        />
      </Stack></Box>

    </Flex>
  );
}
