import React, { useState, useEffect } from "react"
import YouTube from 'react-youtube'
import SpotifyEmbed from 'react-spotify-embed'
import './player.css'

const ytRegex = /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|playlist\?list=)?([A-Za-z0-9\-_]+)/

const insertEmbed = (link, provider) => {
  // We should port this to the backend to create our own embed links
  // Not sure if we will need this with the iFrame APIs
  if (provider === 'YouTube') {
    const match = link.match(ytRegex)
    return `https://youtube.com/${match[3]}${match[4]}`
  }

  else {
    const match = link.match(/https:\/\/open\.spotify\.com\/(track|album)\/(\w*)/)
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}`
  }
}

const MusicLink = ({ link, setActiveTrack }: { link: any, setActiveTrack: () => void }) => {
  const { music }: { music: any } = link
  try { // Using try until we can configure proper embeds in the backend
    // Some links don't have the embed information
    // but we don't need to rely on that if we create our own embeds
    const { source, url } : { source: string, url: string } = music
    const embedLink: string = insertEmbed(url, source)

    return (
      <li className={url.match(/album|playlist/) ? 'playlist' : 'track'}>
        {source === 'YouTube' ? 
          <YouTube // This works, but I haven't found one for Spotify
            videoId={url.match(ytRegex)?.[4] || 'BXPL2-MWSNY'}
            onReady={(e) => console.log('Ready')}                   
            onPlay={(e) => console.log('Playing')}                   
            onPause={(e) => console.log('Paused')}                    
            onEnd={(e) => console.log('End of song')}                     
            onError={(e) => console.log('Error')}                    
          /> :
          <SpotifyEmbed uri={url} />
          
          // I think this is the right way to do it, but I'm not sure
          // https://developer.spotify.com/documentation/embeds/guides/using-the-iframe-api/
          // We can get playback events from the iFrame API
          // Maybe we can add this to the react-spotify-embed component ^^^
          // https://developer.spotify.com/documentation/embeds/references/iframe-api/#playback_update

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
    // This is just for testing
    // I'm not sure if we will need useEffect
    console.log('activeTrack', activeTrack)
    console.log('playing', playing)
  }, [activeTrack, playing])

  return (
    <section id='music-player'>
      <ul className="music-list">
        {links.map((music, index) => (
          <MusicLink link={music} key={index} setActiveTrack={() => setActiveTrack(index)} />
        ))}
      </ul>
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
