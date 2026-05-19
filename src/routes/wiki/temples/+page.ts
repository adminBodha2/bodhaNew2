export const load = async () => {
  return {
    seo: {
      title: 'Hindu Temples Wiki Map | Bodha',
      description: 'A map of Hindu temples, linking to information about temple wiki entries.',
      url: '/wiki/temples',
      image: '/images/bodhacover.png',
      imageAlt: 'Bodha cover image',
      publishedDate: '2026-02-22T10:00:00Z',
      tags: ['Temples', 'Research', 'Hindu'],
      breadcrumbs: [
        { name: 'Temples', url: '/wiki/temples' },
      ],
    }
  };
};
