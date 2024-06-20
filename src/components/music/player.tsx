import React, { useState, useRef, useEffect } from "react"
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

const MusicLink = ({ link, setActiveTrack, setPlaying, playerRef }) => {
  const { music } = link
  try {
    const { source, url } = music
    const embedLink = insertEmbed(url, source)

    return (
      <li className={url.match(/album|playlist/) ? 'playlist' : 'track'}>
        {source === 'YouTube' ? 
          <YouTube
            videoId={url.match(ytRegex)?.[4] || 'BXPL2-MWSNY'}
            onReady={e => {
              playerRef.current = e.target
              console.log('Ready')
            }}
            onPlay={e => setPlaying(true)}
            onPause={e => setPlaying(false)}
            onEnd={e => {
              setPlaying(false)
              setActiveTrack(false)
            }}
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
  const playerRef = useRef(null)

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (playing) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  const handlePrev = () => {
    if (typeof activeTrack === 'number' && activeTrack > 0) {
      setActiveTrack(activeTrack - 1)
    }
  }

  const handleSkip = () => {
    if (typeof activeTrack === 'number' && activeTrack < links.length - 1) {
      setActiveTrack(activeTrack + 1)
    }
  }

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
          <MusicLink link={links[activeTrack]} setActiveTrack={setActiveTrack} setPlaying={setPlaying} playerRef={playerRef} />
        </div>
      )}
      <br />
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, maxWidth: 400 }}>
        <button onClick={handlePrev} style={{ background: 'gray', color: 'white', width: 60, height: 40 }}>
          {'<<<'}
        </button>
        <button onClick={handlePlayPause} style={{ background: 'red', color: 'white', width: 60, height: 40, margin: '0 10px' }}>
          {playing ? '||' : '|>'}
        </button>
        <button onClick={handleSkip} style={{ background: 'gray', color: 'white', width: 60, height: 40 }}>
          {'>>>'}
        </button>
      </section>
    </section>
  )
}

export default MusicPlayer