import fs from 'node:fs/promises'
import path from 'path'
import startClient from '../client.ts'
import { getMusicMessages, parseMessages, grabLinks, musicMatch } from '../music.ts'

// https://devhints.io/jest
// May need for TypeScript https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/

describe("Discord Music", () => {
  it("uses bot token", () => {
    expect(process.env.BOT_TOKEN.length).toBe(59)
  })

  it("starts the discord client", async () => {
    const client = await startClient()
    expect(client.isReady()).toBe(true)
  })

  it("recognizes playlists", async () => {
    const links = [
      {
        content: 'https://www.youtube.com/playlist?list=PLZlA0Gpn_vH-xGQ-nQ87rXI7QkM6W3E79',
      },
      {
        content: 'https://www.youtube.com/watch?v=7ghdL015w5A',
      },
      {
        content: 'https://open.spotify.com/album/1IQmCioMTatFSX6biSISx5?si=P8Z1Qwl0Qsij9DJny64iZA&utm_source=copy-link',
      },
      {
        content: 'https://open.spotify.com/track/3TBHOKAmwkyllUx9DzPioE?si=QB6XCeF6QbGACjtVoB4Gsw&utm_source=copy-link',
      },
    ]

    const matches = links.reduce(musicMatch, [])
    expect(matches).toHaveLength(4)
  })

  it("gets music messages", async () => {
    const messages = await importMockData()
    const shouldMock = shouldUseMockData(messages)
    const mockMessages = jest.fn(() => messages.data)

    const client = await startClient()
    const musicMessages = shouldMock ? mockMessages() : await getMusicMessages(client)
    expect(musicMessages).toHaveLength(100)
    if (!shouldMock) await saveMockData(musicMessages)

    const musicLinks = grabLinks(musicMessages)
    expect(musicLinks[0]).toHaveProperty('music')
    expect(musicLinks[0].music).toEqual(expect.any(String))
  })
})

async function importMockData() {
  const mockPath = path.join(__dirname, '..', '__mocks__', 'music.json')
  try {
    return JSON.parse(await fs.readFile(mockPath))
  } catch (err) {
    return { lastUpdated: null }
  }
}

function shouldUseMockData(messages = {}) {
  const { lastUpdated } = messages
  if (!lastUpdated) return false
  const date = new Date()
  const diff = date - new Date(lastUpdated)
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  return diffDays < 1
}

async function saveMockData(data) {
  const mockedData = parseMessages(data)
  const jsonContent = JSON.stringify({ lastUpdated: new Date(), data: mockedData }, null, 2)
  const mockFolder = path.join(__dirname, '..', '__mocks__')
  const mockFile = path.join(mockFolder, 'music.json')

  try {
    await fs.mkdir(mockFolder, { recursive: true })
    await fs.writeFile(mockFile, jsonContent)
    console.log('Mock data saved')
  } catch (err) {
    console.error(err.message)
  }
}
