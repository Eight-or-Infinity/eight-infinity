import React, { useState, useEffect } from "react"
import YouTube from 'react-youtube'
import SpotifyEmbed from 'react-spotify-embed'
import './player.css'

const ytRegex = /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|playlist\?list=)?([A-Za-z0-9\-_]+)/

const insertEmbed = (link, provider) => {
  if (provider === 'YouTube') {
    const match = link.match(ytRegex)
    return `https://youtube.com/${match[3]}${match[4]}`
  } else {
    const match = link.match(/https:\/\/open\.spotify\.com\/(track|album)\/(\w*)/)
    return `spotify:${match[1]}:${match[2]}`
  }
}

const MusicLink = ({ link, setActiveTrack }) => {
  const { music } = link
  try {
    const { source, url } = music
    const embedLink = insertEmbed(url, source)

    return (
      <li className={url.match(/album|playlist/) ? 'playlist' : 'track'}>
        {source === 'YouTube' ? 
          <YouTube
            videoId={url.match(ytRegex)?.[4] || 'BXPL2-MWSNY'}
            onReady={e => console.log('Ready')}
            onPlay={e => console.log('Playing')}
            onPause={e => console.log('Paused')}
            onEnd={e => console.log('End of song')}
            onError={e => console.log('Error')}
          /> :
          <SpotifyEmbed uri={embedLink} />
        }
      </li>
    )
  } catch(e) {
    console.log(e, link)
    return <li><a href={music}>Error</a></li>
  }
}

const MusicPlayer = ({ links }) => {
  const [activeTrack, setActiveTrack] = useState<number | boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    console.log('activeTrack', activeTrack)
    console.log('playing', playing)
  }, [activeTrack, playing])

  return (
    <section id='music-player'>
      <ul className="music-list">
        {links.map((music, index) => (
          <li key={index}>
            <button onClick={() => setActiveTrack(index)}>Play</button>
          </li>
        ))}
      </ul>
      {activeTrack !== false && (
        <div>
          <MusicLink
            link={links[activeTrack]}
            setActiveTrack={() => setActiveTrack(activeTrack)}
          />
        </div>
      )}
      <br />
      <section style={{ display: 'flex', justifyContent: 'center', borderRadius: 10, maxWidth: 400 }}>
        <button style={{ background: 'red', color: 'white', width: 60, height: 40 }}>
          {playing ? '||' : '|>'}
        </button>
      </section>
    </section>
  )
}

export default MusicPlayer
