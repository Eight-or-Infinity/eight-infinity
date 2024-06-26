import React, { useState, useRef, useEffect } from "react"
import YouTube from 'react-youtube'
import MusicPreview from "./preview"
import SpotifyEmbed from 'react-spotify-embed'
// For local development
// import SpotifyEmbed from "../../../../react-spotify-embed/src/main"
import { ytRegex, spotRegex } from "../../utils"
import './player.css'

const insertEmbed = (link, provider) => {
  if (provider === 'YouTube') {
    const match = link.match(ytRegex)
    return `${match[1]}`
  } else {
    const match = link.match(spotRegex)
    return `spotify:${match[1]}:${match[2]}`
  }
}

const MusicLink = (props) => {
  const { activeTrack, handlePause, handleEnd, setPlaying, setReady } = props
  const { youtubeEmbedRef, spotifyEmbedRef } = props
  const { link, playing } = props
  const { music } = link

  try {
    const { source, url } = music
    const embedLink = insertEmbed(url, source)

    return (
      <section id="player" className={url.match(/album|playlist/) ? 'playlist' : 'track'}>
          {source === 'YouTube'
          ? <YouTube
              ref={youtubeEmbedRef}
              videoId={embedLink}
              onReady={e => {
                youtubeEmbedRef.current = e.target
                setReady(true)
              }}
              opts={{ playerVars: { autoplay: playing ? 1 : 0 } }}
              onPlay={e => setPlaying(true)}
              onPause={() => handlePause(activeTrack)}
              onEnd={e => handleEnd()}
              onError={e => console.log('Error', e)}
            />
          : <SpotifyEmbed
              ref={spotifyEmbedRef}
              uri={embedLink}
              onPlay={() => setPlaying(true)}
              onPause={() => handlePause(activeTrack)}
              onEnd={() => handleEnd()}
              onReady={() => setReady(true)}
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
  const [ready, setReady] = useState<boolean>(false)
  const youtubeEmbedRef = useRef<any>(null)
  const spotifyEmbedRef = useRef<any>(null)

  const handlePlayPause = () => {
    if (youtubeEmbedRef.current || spotifyEmbedRef.current) {
      const { source } = links[activeTrack].music

      if (playing) {
        source === 'YouTube'
        ? youtubeEmbedRef.current?.pauseVideo()
        : spotifyEmbedRef.current?.pause()
      } else {
        source === 'YouTube'
        ? youtubeEmbedRef.current?.playVideo()
        : spotifyEmbedRef.current?.togglePlay()
      }
    }
  }

  const changeTrack = (newTrack: number) => {
    if (newTrack >= 0 && newTrack < links.length) {
      const { source } = links[newTrack].music

      if (source === 'Spotify') {
        const uri = insertEmbed(links[newTrack].music.url, 'Spotify');
        spotifyEmbedRef.current?.loadUri(uri);
      }
    }
  }

  const autoPlay = () => {
    if (ready && playing) {
      if (links[activeTrack].music.source === 'Spotify') {
        spotifyEmbedRef.current?.resume()
      }
    }
  }

  const handleNext = (index: number) => {
    setReady(false)
    setActiveTrack(index)
  }

  const handlePause = () => setPlaying(false)
  const handlePrev = () => handleNext(activeTrack - 1)
  const handleSkip = () => handleNext(activeTrack + 1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeTrack(activeTrack), [activeTrack])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => autoPlay(), [ready, activeTrack])

  return (
    <section id='music-player'>
      <ul className="music-list">
        {links.map((link, index) => (
          <li key={index}>
            <MusicPreview message={link} onClick={() => handleNext(index)} />
          </li>
        ))}
      </ul>
      {activeTrack > -1 ? (
        <MusicLink
          link={links[activeTrack]}
          activeTrack={activeTrack}
          handlePause={handlePause}
          handleEnd={handleSkip}
          playing={playing}
          setPlaying={setPlaying}
          setReady={setReady}
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