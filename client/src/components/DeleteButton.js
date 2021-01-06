import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import { DELETE_POST_MUTATION, GET_POSTS_REQUEST } from '../utils'

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)
      const data = proxy.readQuery({
        query: GET_POSTS_REQUEST,
      })
      proxy.writeQuery({
        query: GET_POSTS_REQUEST,
        data: { getPosts: data.getPosts.filter((post) => post.id !== postId) },
      })
      if (callback) callback()
    },
    variables: { postId },
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
        onConfirm={deletePost}
      />
    </>
  )
}

export default DeleteButton
