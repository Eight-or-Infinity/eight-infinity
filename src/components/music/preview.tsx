import React from 'react'
import { Tooltip } from 'antd'
import Icons from '../../assets/icons'

interface MusicPreviewProps {
  message: any
}

const MusicPreview: React.FC<MusicPreviewProps> = ({ message }) => {
  const { author, content, embeds } = message
  const [embed] = embeds
  const { description, provider, thumbnail, title } = embed
  const { name } = provider
  const Icon: SVGRectElement = Icons[name]
  const desc = embed.author ? embed.author.name : description

  return (
    <section className='music-info' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <img src={author.avatarURL} alt="user-profile" style={{ width: '50px', borderRadius: '50%', marginRight: '10px' }} />
      <div>
        <div>
          <h5 className="music-title">
            <Tooltip title={content} placement="right">
              <a href={content} target="_blank" rel="noreferrer">
                <Icon />
              </a>
            </Tooltip>
            <span>{title}</span>
          </h5>
        </div>
        <div className="music-description-wrapper">
          <span className="music-description">{desc}</span>
        </div>
      </div>
    </section>
  )
}

export default MusicPreview;