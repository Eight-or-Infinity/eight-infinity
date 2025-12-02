type Props = {
  title: string
  content: string
  author: {
    avatarURL: string
    globalName: string
  }
}

function ArticlePreview({ title, content, author }: Props) {
  return (
    <article style={{ marginBottom: '2rem' }}>
      <h3>{title}</h3>
      <p>by <img style={{ borderRadius: 100, width: 32, marginBottom: 0 }} src={author.avatarURL}></img> <b>{author.globalName}</b></p>
    </article>
  )
}

export default ArticlePreview