import { GetStaticPaths, GetStaticProps } from 'next'
import { useState, useEffect } from "react"
import Layout from "../../components/layout"
import ArticlePreview from "../../components/articles/preview";
import 'antd/dist/antd.css';
import "../index.css"

// Fetch all articles to generate paths
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('/api/articles')
  const data = await response.json()
  
  const paths = data.data.map((article: any) => ({
    params: { id: article.post.id.toString() }
  }))
  
  return {
    paths,
    fallback: false // or 'blocking' if you want incremental static regeneration
  }
}

// Fetch specific article data
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(`/api/articles/${params?.id}`)
  const article = await response.json()
  
  return {
    props: {
      article
    }
  }
}

const fetchArticles = async () => {
  // const response = await fetch('/api/articles')
  const response = await fetch('/.netlify/functions/articles') // for local dev with netlify functions
  const data = await response.json()
  return data
}

const ArticlePage = () => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetchArticles().then(data => setArticles(data.data))
  }, [])
  console.log('articles', articles)

  return (
    <Layout>
      <section>
        <h1 style={{ textAlign: 'center' }}>Articles</h1>
        {articles.map(({ post, content, author }) => (
          <a key={post.id} href={`/articles/${post.id}`}>
            <ArticlePreview
              title={post.name}
              content={content.content}
              author={author}
            />
          </a>
        ))}
      </section>
    </Layout>
  )
}

export default ArticlePage