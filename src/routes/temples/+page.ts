export const load = async () => {
  return {
    seo: {
      title: 'My Awesome Article',
      description: 'A complete guide on Svelte 5 and SEO.',
      url: '/blog/my-article',
      image: '/images/cover.jpg',
      imageAlt: 'Article cover with Svelte logo',
      publishedDate: '2026-02-22T10:00:00Z',
      tags: ['Svelte', 'SEO', 'Web Development'],
      breadcrumbs: [
        { name: 'Blog', url: '/blog' },
        { name: 'My Awesome Article', url: '/blog/my-article' }
      ],
      alternates: [
        { hreflang: 'pt-BR', href: '/blog/my-article' },
        { hreflang: 'en-US', href: '/en/blog/my-article' }
      ]
    }
  };
};