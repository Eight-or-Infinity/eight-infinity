import React, { useState } from 'react'
import siteMetadata from '../../../brandconfig'
import { Card } from "antd"
import LinkSection from './links'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const { Meta } = Card

const pic = ({ image, expand }) => (
  <img
    className={`profile-pic ${expand ? 'expand' : ''}`}
    src={image.location}
    alt={image.alt}
    // formats={["AUTO", "WEBP", "AVIF"]}
  />
)

const buildCred = ({ title, org, url }) => (
  org.length ? <div key={org}>{title} at <a href={url}>{org}</a></div> : null
)

const Intro = data => {
  const { main, secondary, credentials, expand } = data

  return (
    <div>
      <div>{main}{secondary ? ` • ${secondary}` : null}</div>
      {expand && credentials.map(buildCred)}
    </div>
  )
}

const Profile = () => {
  const [expand, setExpand] = useState(false)
  const { main, secondary, credentials, name, image } = siteMetadata.intro
  const ExpandIcon = expand ? UpOutlined : DownOutlined
  
  return (
    <Card
      title={null}
      hoverable
      style={{ minWidth: 320, padding: 20 }}
      cover={pic({ image, expand })}
      onClick={e => setExpand(!expand)}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Meta
          title={name}
          description={Intro({ main, secondary, credentials, expand })}
          style={{ textAlign: 'center', marginBottom: 10, justifyContent: 'center' }}
        />
        <LinkSection expand={expand} />
        <ExpandIcon id='expand-icon' key="setting" />
      </div>
    </Card>
  )
}

export default Profile
