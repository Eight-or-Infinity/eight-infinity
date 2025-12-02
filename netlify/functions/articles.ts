import startClient from '../../discord/client'
import { getArticles } from '../../discord/articles'

export const handler = async (event, context) => {
  const client = await startClient()
  const links = await getArticles(client)

  return {
    statusCode: 200,
    body: JSON.stringify({ data: links }),
  }
}