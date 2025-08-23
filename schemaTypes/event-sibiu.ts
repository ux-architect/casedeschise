import { eventFields } from "./objects/event-fields";
import { splitNamePreview } from "./objects/split-name-preview";

const eventSibiu = {
  name: "events-sibiu",
  title: "Evenimente Sibiu",
  type: "document",

 fields: [
    ...eventFields,
  ],

  preview: splitNamePreview,
}

export default eventSibiu;
