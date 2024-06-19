import startClient from '../../discord/client'
import { getMusic } from '../../discord/music'

export const handler = async (event, context) => {
  const client = await startClient()
  const musicLinks = await getMusic(client)

  return {
    statusCode: 200,
    body: JSON.stringify({ data: musicLinks }),
  }
}