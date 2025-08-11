import React from 'react'
import { Tooltip } from 'antd'
import Icons from '../../assets/icons'
import { ytRegex, spotRegex } from "../../utils"

interface MusicPreviewProps {
  message: any
  onClick: () => void
}

const MusicPreview: React.FC<MusicPreviewProps> = ({ message, onClick }) => {
  const { author, content, embeds } = message
  const [embed] = embeds
  const { provider, thumbnail, title } = embed
  const { name } = provider
  const Icon: SVGRectElement = Icons[name]

  const handleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection()?.toString() || ''
    const isExcluded = isExcludedElement(e.target as HTMLElement)
    if (selection.length <= 0 && !isExcluded) onClick()
  }

  console.log('message', message.content)
  const userMessage = message.content
    .replace(ytRegex, '')
    .replace(spotRegex, '')
    .replace(/\?.*$/, '') // Remove any query parameters
    .replace(/#.*$/, '')  // Remove any hash fragments
    .replace(/<@\d{18}>/g, '@passenger') // Replace all user mentions with generic name
    .trim()

  return (
    <section className='music-info' onClick={handleClick}>
      <div className='cred'>
        <img
          src={author.avatarURL}
          alt="user-profile"
        />
        <span>{userMessage.length ? userMessage : "8/∞"}</span>
      </div>
      <div>
        <h5 className="music-title">
          <Tooltip title={content} placement="right">
            <a href={content} target="_blank" rel="noreferrer"><Icon /></a>
          </Tooltip>
          <span>{title}</span>
        </h5>
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