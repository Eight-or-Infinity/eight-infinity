import { parse, stringify } from 'flatted'
import { ytRegex, spotRegex } from '../src/utils'

async function getMusic(client) {
  const messages = await getMusicMessages(client)
  const links = grabLinks(messages)
  return links
}

async function getMusicMessages(client) {
  const guild = await client.guilds.cache.get(process.env.DISCORD_SERVER)
  const channel = await guild.channels.cache.find(chan => chan.name.match(/music$/)) // Designated Channel
  const messages = await channel.messages.fetch({ limit: 100 })
  const messageArray = Array.from(messages.values())
  return parseMessages(messageArray)
}

function parseMessages(messages) {
  return messages.map(msg => {
    const { channelId, content, id, author, createdTimestamp, embeds } = msg
    const message = { channelId, content, id, author, createdTimestamp, embeds }
    return Object.assign({}, parse(stringify(message)))
  })
}

function grabLinks(messages) {
  return messages.reduce(musicMatch, [])
}

export const musicMatch = (list, msg) => {
  const ytMatch = msg.content.match(ytRegex)
  const spotMatch = msg.content.match(spotRegex)

  if (ytMatch || spotMatch) {
    const music = ytMatch ?
      { source: 'YouTube', url: ytMatch[0] } :
      { source: 'Spotify',  url: spotMatch[0] }
    list.push({ music, ...msg })
  }

  return list
}

export { getMusic, getMusicMessages, parseMessages, grabLinks }
