import { defineField } from "sanity";

export const signupEntriesFields = [
  defineField({ name: "id", type: "string" }),
  defineField({
    name: "objectives",
    title: "Objectives",
    type: "array",
    of: [
      {
        type: "object",
        fields: [defineField({ name: "status", type: "number" })],
        preview: {
          select: { key: "_key", status: "status" },
          prepare(selection) {
            return { title: selection.key + " " + selection.status };
          },
        },
      },
    ],
  }),
  defineField({ name: "name", type: "string" }),
  defineField({ name: "email", title: "Email", type: "string" }),
  defineField({ name: "phone", type: "string" }),
  defineField({ name: "details", type: "datetime" }),
  defineField({ name: "metadata", title: "Ordonare", type: "tourMetadata" }),
];