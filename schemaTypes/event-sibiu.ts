import { tourFields } from "./objects/event-fields";

const eventSibiu = {
  name: "events-sibiu",
  title: "Evenimente Sibiu",
  type: "document",

 fields: [
    ...tourFields,
  ],

  preview: {
    select: { title: 'name', },
    prepare(selection: { title?: string }) {
      let mainTitle = selection.title ?? '';
      let subtitle;

      if (mainTitle.includes('///')) {
        const parts = mainTitle.split('///').map(p => p.trim());
        mainTitle = parts[0];
        subtitle = parts[1];
      }

      return {
        title: mainTitle,
        subtitle: subtitle,
        // media: yourImageField,
      };
    }
  }
}

export default eventSibiu;
