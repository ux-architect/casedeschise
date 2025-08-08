// schemaTypes/objects/split-name-preview.ts

export const splitNamePreview = {
  select: { title: 'name', media: 'profileImage1',  },

  prepare(selection: { title?: string, media? : any}) {
    let mainTitle = selection.title ?? '';
    let subtitle;
    let media = selection.media;

    if (mainTitle.includes('///')) {
      const parts = mainTitle.split('///').map(p => p.trim());
      mainTitle = parts[0];
      subtitle = parts[1];
    }

    return {
      title: mainTitle,
      subtitle: subtitle,
      media
    };
  },
};