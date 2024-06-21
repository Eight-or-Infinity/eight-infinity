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
  const { setActiveTrack, setPlaying } = props
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
              setActiveTrack(false)
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
  const [activeTrack, setActiveTrack] = useState<number | boolean>(false)
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

  const changeTrack = (direction) => {
    const trackChange = direction === 'prev' ? -1 : 1;
    const newTrack = activeTrack + trackChange;
    if (typeof activeTrack === 'number' && newTrack >= 0 && newTrack < links.length) {
      const prevSource = links[activeTrack].music.source;
      const nextSource = links[newTrack].music.source;

      setActiveTrack(newTrack);
      if (prevSource === 'Spotify' && nextSource === 'Spotify') {
        const uri = insertEmbed(links[newTrack].music.url, 'Spotify');
        spotifyEmbedRef.current?.loadUri(uri);
      }
    }
  };

  const handlePrev = () => changeTrack('prev')
  const handleSkip = () => changeTrack('next')

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
        <MusicLink
          link={links[activeTrack]}
          setActiveTrack={setActiveTrack}
          setPlaying={setPlaying}
          youtubeEmbedRef={youtubeEmbedRef}
          spotifyEmbedRef={spotifyEmbedRef}
        />
      )}
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