import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  GET_POSTS_REQUEST,
} from '../utils'

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)
      if (!commentId) {
        const data = proxy.readQuery({
          query: GET_POSTS_REQUEST,
        })
        proxy.writeQuery({
          query: GET_POSTS_REQUEST,
          data: {
            getPosts: data.getPosts.filter((post) => post.id !== postId),
          },
        })
      }
      if (callback) callback()
    },
    variables: { commentId, postId },
  })
  return (
    <>
      <Button
        color="red"
        icon="trash"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  )
}

export default DeleteButton
