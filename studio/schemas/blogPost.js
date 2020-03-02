export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
      }
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string'
    },
    {
      title: 'Main Image',
      name: 'main_image',
      type: 'image'
    },
    {
      title: 'Publish Date',
      name: 'publish_date',
      type: 'date'
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'These are tags for the blog post.'
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [
        {
          type: 'block',
          // styles: [
          //   { title: 'Normal', value: 'normal'},
          //   { title: 'H1', value: 'h1' },
          //   { title: 'H2', value: 'h2' },
          //   { title: 'H3', value: 'h3' },
          //   { title: 'Blockquote', value: 'blockquote' }
          // ],
        },
        {
          type: 'image',
        },
        // {
        //   name: 'contentImage',
        //   title: 'Content Image',
        //   type: 'contentImage'
        // }
      ]
    },
  ]
}
