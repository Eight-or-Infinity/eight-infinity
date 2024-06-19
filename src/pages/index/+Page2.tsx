import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Profile from '../../components/profile/main'
import 'antd/dist/antd.css';
import "./index.css"

export const Head = () => <SEO />

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <Profile />
    </Layout>
  </React.StrictMode>,
)
