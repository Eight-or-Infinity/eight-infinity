import React from 'react'
import Facebook from './Facebook.svg'
import Instagram from './Instagram.svg'
import Twitch from './Twitch.svg'
import Twitter from './Twitter.svg'
import YouTube from './YouTube.svg'
import Spotify from './Spotify.svg'
import Audius from './Audius.svg'
import OpenSea from './OpenSea.svg'
import Discord from './Discord.svg'

const backgroundIcon = ({ Icon }) => {
  return (
    <div
      className='svg-icon-background'
      style={{
        WebkitBackgroundImage: `url(${Icon})`,
        backgroundImage: `url(${Icon})`,
      }}
    />
  )
}

const maskIcon = ({ color, Icon }) => {
  return (
    <div
      className='svg-icon-mask'
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${Icon})`,
        maskImage: `url(${Icon})`,
      }}
    />
  )
}

const Icons = {
  Facebook: () => backgroundIcon({ color: null, Icon: Facebook }),
  Instagram: () => backgroundIcon({ color: null, Icon: Instagram }),
  Twitch: () => backgroundIcon({ color: null, Icon: Twitch }),
  Twitter: () => backgroundIcon({ color: null, Icon: Twitter }),
  YouTube: () => backgroundIcon({ color: 'red', Icon: YouTube }),
  Spotify: () => maskIcon({ color: '#1DB954', Icon: Spotify }),
  Audius: () => backgroundIcon({ color: null, Icon: Audius }),
  OpenSea: () => backgroundIcon({ color: null, Icon: OpenSea }),
  Discord: () => backgroundIcon({ color: null, Icon: Discord }),
}

export default Icons
