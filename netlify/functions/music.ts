const startClient = require('../../discord/client.js')
const { getMusic } = require('../../discord/music.ts')

const handler = async (event, context) => {
  const client = await startClient()
  const musicLinks = await getMusic(client)

  return {
    statusCode: 200,
    body: JSON.stringify({ data: musicLinks }),
  }
}

module.exports = { handler }
