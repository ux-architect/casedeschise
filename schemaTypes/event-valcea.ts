import { eventFields } from "./objects/event-fields";
import { splitNamePreview } from "./objects/split-name-preview";

const eventValcea = {
  name: "events-valcea",
  title: "Evenimente Valcea",
  type: "document",

 fields: [
    ...eventFields,
  ],
  preview: splitNamePreview,
};

export default eventValcea;
