import React, { useState, useRef, useEffect } from "react"
import YouTube from 'react-youtube'
import SpotifyEmbed from 'react-spotify-embed'
// For local development
// import SpotifyEmbed from "../../../../react-spotify-embed/src/main"
import { ytRegex, spotRegex } from "../../utils"
import './player.css'


const insertEmbed = (link, provider) => {
  if (provider === 'YouTube') {
    const match = link.match(ytRegex)
    return `https://youtube.com/${match[3]}${match[4]}`
  } else {
    const match = link.match(spotRegex)
    return `spotify:${match[1]}:${match[2]}`
  }
}

const MusicLink = (props) => {
  const { activeTrack, setActiveTrack, setPlaying } = props
  const { youtubeEmbedRef, spotifyEmbedRef } = props
  const { link } = props
  const { music } = link

  try {
    const { source, url } = music
    const embedLink = insertEmbed(url, source)

    return (
      <section id="player" className={url.match(/album|playlist/) ? 'playlist' : 'track'}>
        {source === 'YouTube' ?
          <YouTube
            ref={youtubeEmbedRef}
            videoId={url.match(ytRegex)?.[4] || 'BXPL2-MWSNY'}
            onReady={e => {
              youtubeEmbedRef.current = e.target
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
          <SpotifyEmbed
            ref={spotifyEmbedRef}
            uri={embedLink}
            onPlay={e => setPlaying(true)}
            onPause={e => setPlaying(false)}
            onEnd={e => {
              setPlaying(false)
              setActiveTrack(activeTrack + 1)
            }}
          />
        }
      </section>
    )
  } catch (e) {
    console.log(e, link)
    return <li><a href={music}>Error</a></li>
  }
}

const MusicPlayer = ({ links }) => {
  const [activeTrack, setActiveTrack] = useState<number>(-1)
  const [playing, setPlaying] = useState<boolean>(false)
  const youtubeEmbedRef = useRef<any>(null)
  const spotifyEmbedRef = useRef<any>(null)

  const handlePlayPause = () => {
    if (youtubeEmbedRef.current || spotifyEmbedRef.current) {

      if (playing) {
        youtubeEmbedRef.current?.pauseVideo()
        spotifyEmbedRef.current?.togglePlay()
      } else {
        youtubeEmbedRef.current?.playVideo()
        spotifyEmbedRef.current?.togglePlay()
      }
    }
  }

  const changeTrack = (newTrack: number) => {
    if (typeof activeTrack === 'number' && newTrack >= 0 && newTrack < links.length) {
      const { source } = links[newTrack].music
      
      if (source === 'Spotify') {
        const uri = insertEmbed(links[newTrack].music.url, 'Spotify');
        spotifyEmbedRef.current?.loadUri(uri);
      }
    }
  }

  const handlePrev = () => setActiveTrack(activeTrack - 1)
  const handleSkip = () => setActiveTrack(activeTrack + 1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeTrack(activeTrack), [activeTrack])

  return (
    <section id='music-player'>
      <ul className="music-list">
        {links.map((music, index) => (
          <li key={index}>
            <button onClick={() => setActiveTrack(index)}>
              Load
            </button>
          </li>
        ))}
      </ul>
      {activeTrack > -1 ? (
        <MusicLink
          link={links[activeTrack]}
          activeTrack={activeTrack}
          setActiveTrack={setActiveTrack}
          setPlaying={setPlaying}
          youtubeEmbedRef={youtubeEmbedRef}
          spotifyEmbedRef={spotifyEmbedRef}
        />) : <section id="player"></section>
      }
      <section className="player-controls">
        <button className="button" onClick={handlePrev}>
          {'<<<'}
        </button>
        <button className="button playback" onClick={handlePlayPause}>
          {playing ? '||' : '|>'}
        </button>
        <button className="button" onClick={handleSkip}>
          {'>>>'}
        </button>
      </section>
    </section>
  )
}

export default MusicPlayer