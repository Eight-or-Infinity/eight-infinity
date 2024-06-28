import React from "react"
import siteMetaData from "../../brandconfig"
import icon from "../assets/profile-image.png"

type SEOProps = {
  description?: string,
  lang?: string,
  meta?: HTMLMetaElement[],
  title?: string
}

type MetaProps = {
  name?: string,
  property?: string,
  content: string
}

const SEO = ({ description, lang = 'en', meta = [], title }: SEOProps) => {
  const metaDescription = description || siteMetaData.description
  const realTitle = title || siteMetaData?.title

  const metaList: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: realTitle,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `lang`,
      content: lang,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: `${siteMetaData.url}${siteMetaData.image.location}`
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetaData?.author || ``,
    },
    {
      name: `twitter:title`,
      content: realTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  return (
    <>
      <title>{realTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {metaTags(metaList)}
      {meta.map((tag) => tag)}
      <link rel="icon" type="image/png" href={icon} />
    </>
  )
}

const metaTags = (tags: MetaProps[]) => (
  tags.map(({ name, property, content }) => (
    <meta key={name || property} name={name} content={content} />
  ))
)

export default SEO