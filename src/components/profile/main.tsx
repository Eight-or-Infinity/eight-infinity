// import React, { useState } from 'react'
// import { useStaticQuery, graphql } from "gatsby"
// import { GatsbyImage, getImage } from 'gatsby-plugin-image'
// import { Card } from "antd"
// import LinkSection from './links'
// import { DownOutlined, UpOutlined } from '@ant-design/icons'

const Test = () => {
  return <div>Test</div>
}

export default Test

// const { Meta } = Card

// const pic = ({ image, expand }) => (
//   <GatsbyImage
//     className={expand ? 'expanded' : ''}
//     style={{ textAlign: 'center', maxHeight: expand ? 150 : 300 }}
//     // style={{ textAlign: 'center', maxWidth: expand ? 150 : 300 }}
//     imgStyle={{ textAlign: 'center', borderRadius: expand ? '50%' : '8%' }}
//     objectPosition='center center'
//     objectFit='contain'
//     image={getImage(image)}
//     alt='Profile Image'
//   />
//     // <img
//     //   src={image.location}
//     //   style={{ borderRadius: expand ? '50%' : '8%', maxWidth: expand ? 150 : 300 }}
//     //   alt={image.alt}
//     //   // width={300}
//     //   // quality={95}
//     //   // formats={["AUTO", "WEBP", "AVIF"]}
//     // />
// )

// const buildCred = ({ title, org, url }) => (
//   org.length ? <div key={org}>{title} at <a href={url}>{org}</a></div> : null
// )

// const Intro = data => {
//   const { main, secondary, credentials, expand } = data

//   return (
//     <div>
//       <div>{main}{secondary ? ` • ${secondary}` : null}</div>
//       {expand && credentials.map(buildCred)}
//     </div>
//   )
// }

// const Profile = () => {
//   const [expand, setExpand] = useState(false)
//   const mainQuery = useStaticQuery(
//     graphql`
//       query {
//         site: site {
//           siteMetadata {
//             intro {
//               name
//               image {
//                 location
//                 alt
//               }
//               main
//               secondary
//               credentials {
//                 title
//                 org
//                 url
//               }
//             }
//           }
//         },
//         profileImage: file(relativePath: { regex: "/profile-image.(jpg|png)/" }) {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//     `
//   )

//   const { main, secondary, credentials, name } = mainQuery.site.siteMetadata.intro
//   const ExpandIcon = expand ? UpOutlined : DownOutlined
//   mainQuery.profileImage.childImageSharp.gatsbyImageData.backgroundColor = 'transparent'
  
//   return (
//     <Card
//       title={null}
//       hoverable
//       style={{ minWidth: 320, padding: 20 }}
//       cover={pic({ image: mainQuery.profileImage, expand })}
//       onClick={e => setExpand(!expand)}
//     >
//       <div style={{ display: 'flex', flexDirection: 'column' }}>
//         <Meta
//           title={name}
//           description={Intro({ main, secondary, credentials, expand })}
//           style={{ textAlign: 'center', marginBottom: 10, justifyContent: 'center' }}
//         />
//         <LinkSection expand={expand} />
//         <ExpandIcon id='expand-icon' key="setting" />
//       </div>
//     </Card>
//   )
// }

// // export default Profile
