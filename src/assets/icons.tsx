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

interface IconProps {
  color?: string;
  Icon: string;
}

const backgroundIcon = ({ Icon }: IconProps) => {
  return (
    <div
      className='svg-icon-background'
      style={{ backgroundImage: `url("${Icon}")` }}
    />
  )
}

const maskIcon = ({ color, Icon }: IconProps) => {
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
  Facebook: () => backgroundIcon({ Icon: Facebook }),
  Instagram: () => backgroundIcon({ Icon: Instagram }),
  Twitch: () => backgroundIcon({ Icon: Twitch }),
  Twitter: () => backgroundIcon({ Icon: Twitter }),
  YouTube: () => backgroundIcon({ color: 'red', Icon: YouTube }),
  Spotify: () => maskIcon({ color: '#1DB954', Icon: Spotify }),
  Audius: () => backgroundIcon({ Icon: Audius }),
  OpenSea: () => backgroundIcon({ Icon: OpenSea }),
  Discord: () => backgroundIcon({ Icon: Discord }),
}

export default Icons
