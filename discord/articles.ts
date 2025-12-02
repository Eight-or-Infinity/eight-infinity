async function getArticles(client) {
  const messages = await getArticlePosts(client)
  return messages
  // const links = grabLinks(messages)
  // return links
}

async function getArticlePosts(client) {
  const guild = await client.guilds.cache.get(process.env.DISCORD_SERVER)
  const channel = await guild.channels.cache.find(chan => chan.name.match(/disblog$/)) // Designated Channel
  const activePosts = await channel.threads.fetch()
  const stalePosts = await channel.threads.fetchArchived({ fetchAll: true })

  const activeArray = Array.from(activePosts.threads.values())
  const staleArray = Array.from(stalePosts.threads.values())
  const allPosts = [...activeArray, ...staleArray]
  const plainPosts = allPosts.map(post => post.toJSON())
  const postContents = await Promise.all(
    plainPosts.map(async post => (
      { content: await getPostContent(channel, post), post }
    ))
  )

  const postContentsAttribution = await Promise.all(
    postContents.map(async ({ content, post }) => {
      const author = await client.users.fetch(content.author.id)
      return { content, post, author: author.toJSON() }
    })
  )

  return postContentsAttribution
}

async function getPostContent(channel, post) {
  const data = await channel.threads.cache.get(post.id).messages.fetch(post.id)
  return data
  return data.toJSON()
}

export { getArticles, getArticlePosts }
