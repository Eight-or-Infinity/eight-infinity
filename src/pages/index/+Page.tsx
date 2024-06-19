import Layout from "../../components/layout"
// import SEO from "../../components/seo"
import Profile from '../../components/profile/main'
import siteMetadata from '../../../brandconfig'

import 'antd/dist/antd.css';
import "./index.css"

// export const Head = () => <SEO />
console.log('siteMetadata', siteMetadata)

const Page = () => (
  <Layout>
    <h1>Hi World</h1>
    <h3>I'm in the /pages/index/+Page.tsx file</h3>
    <p>We can add more pages like /pages/music/+Page.tsx</p>
    <p>Use this
      <a href="https://github.com/brunsten/vike-react-netlify/tree/main">package </a>
      for structure inspiration
    </p>
    <Profile />
  </Layout>
)

export default Page