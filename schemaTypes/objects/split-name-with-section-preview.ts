export const splitNameWithSectionPreview = {
  select: {
    title: 'name',
    section: 'metadata.section',
    media: 'profileImage', // optional – remove or change if needed
  },
  prepare(selection: { title?: string; section?: string; media?: any }) {
    let { title = 'Fără titlu', section, media } = selection;

    // Section label (s1, s2, etc.)
    let sectionLabel = '';
    if (section === '1') sectionLabel = '(s1): ';
    else if (section === '2') sectionLabel = '(s2): ';
    else if (section === '3') sectionLabel = '(s3): ';
    else if (section === '4') sectionLabel = '(s4): ';

    // Split title if it contains '///'
    let mainTitle = title;
    let subtitle;
    if (title.includes('///')) {
      const parts = title.split('///').map((p) => p.trim());
      mainTitle = parts[0];
      subtitle = parts[1];
    }

    return {
      title: `${sectionLabel}${mainTitle}`,
      subtitle,
      media,
    };
  },
};