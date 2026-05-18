export const load = async () => {
  return {
    seo: {
      title: 'Temples Map | Bodha',
      description: 'A map of Hindu temples, linking to infomation about them.',
      url: '/temples',
      image: '/images/bodhacover.png',
      imageAlt: 'Bodha cover image',
      publishedDate: '2026-02-22T10:00:00Z',
      tags: ['Temples', 'Research', 'Hindu'],
      breadcrumbs: [
        { name: 'Temples', url: '/temples' },
      ],
    }
  };
};