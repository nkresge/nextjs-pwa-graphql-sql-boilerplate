// import { Link } from '../server/routes'
import { useUpdateArticle, useDeleteArticle } from '../hooks/useArticle'

const usePromptAndUpdateArticle = (article, fieldName) => {
  const updateArticle = useUpdateArticle()

  const handleUpdate = async () => {
    const newValue = window.prompt(`New value for ${fieldName}?`, article[fieldName])
    if (newValue) {
      const variables = {
        id: article.id,
        [fieldName]: newValue
      }
      await updateArticle({ variables })
    }
  }

  return handleUpdate
}

const usePromptAndDeleteArticle = (article) => {
  const deleteArticle = useDeleteArticle(article)

  const handleDelete = async () => {
    if (window.confirm(`Delete ${article.title}?`)) {
      const variables = {
        id: article.id
      }
      await deleteArticle({ variables })
    }
  }

  return handleDelete
}

const Article = ({ article, index, inProgress = false }) => {
  const promptAndUpdateArticle = usePromptAndUpdateArticle(article, 'title')
  const promptAndDeleteArticle = usePromptAndDeleteArticle(article)

  return (
    <div className={inProgress === article.id ? 'inProgress' : ''} title={`id: ${article.id}`}>
      {article.title}
      <a className='action update' onClick={promptAndUpdateArticle}>Update</a>
      <a className='action delete' onClick={promptAndDeleteArticle}>Delete</a>
      <style jsx>{`
        a.action {
          margin-left: 0.5em;
          cursor: pointer;
          font-size: 0.6em;
          text-transform: uppercase;
        }
        a.update {
          color: lime;
        }
        a.delete {
          color: tomato;
        }

        .inProgress {
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}
export default Article