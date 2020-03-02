import React from 'react'
import { Link, graphql } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    )
  }
}

export const query = graphql`
  {
    allSanityBlogPost {
      totalCount
      edges {
        node {
          title
          slug {
            current
          }
          description
          publish_date
          keywords
          _rawContent
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title='Home' />
    <h1>HI PEOPLE - Welcome to my Gatsby site!!</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <Link to='/page-2/'>Go to page 2</Link>
    <div className='blog-title'>
      {/* <div>{data.allSanityBlogPost.edges[0]}</div> */}
      <h2>{data.allSanityBlogPost.edges[1].node.title}</h2>
      <p>{data.allSanityBlogPost.edges[1].node.slug.current}</p>
      <p>{data.allSanityBlogPost.edges[1].node.description}</p>
      <p>{data.allSanityBlogPost.edges[1].node.publish_date}</p>
      <ul>
        {data.allSanityBlogPost.edges[1].node.keywords.map(keyword => <li>{keyword}</li>)}
      </ul>
      <BlockContent blocks={data.allSanityBlogPost.edges[1].node._rawContent} serializers={serializers} />
    </div>
  </Layout>
)

export default IndexPage
