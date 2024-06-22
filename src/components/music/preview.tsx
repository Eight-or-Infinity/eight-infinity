import React from 'react'
import { Tooltip } from 'antd'
import Icons from '../../assets/icons'

interface MusicPreviewProps {
  message: any
  onClick: () => void
}

const MusicPreview: React.FC<MusicPreviewProps> = ({ message, onClick }) => {
  const { author, content, embeds } = message
  const [embed] = embeds
  const { description, provider, thumbnail, title } = embed
  const { name } = provider
  const Icon: SVGRectElement = Icons[name]
  const desc = embed.author ? embed.author.name : description

  const handleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection()?.toString() || ''
    const isExcluded = isExcludedElement(e.target as HTMLElement)
    if (selection.length <= 0 && !isExcluded) onClick()
  }

  return (
    <section className='music-info' onClick={handleClick}>
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
          <span className="music-description">
            {desc.replace(/ - Topic/, '')}
          </span>
        </div>
      </div>
    </section>
  )
}

function isExcludedElement(element: HTMLElement | null): boolean {
  const exclude = ['svg-icon-background', 'svg-icon-mask']
  while (element && element !== document.body) {
    const { classList, parentNode } = element
    if (element instanceof HTMLElement) {
      if (exclude.some(ex => classList.contains(ex))) return true
    }
    element = parentNode! as HTMLElement
  }
  return false
}


export default MusicPreview