import { Button, Form } from 'semantic-ui-react'
import { CREATE_POST_MUTATION, GET_POSTS_REQUEST, useForm } from '../utils'

const PostForm = () => {
  const { onSubmit, onChange, values, errors, loading } = useForm(
    CREATE_POST_MUTATION,
    { body: '' },
    (proxy, { data: { createPost } }) => {
      const data = proxy.readQuery({
        query: GET_POSTS_REQUEST,
      })
      proxy.writeQuery({
        query: GET_POSTS_REQUEST,
        data: { getPosts: [createPost, ...data.getPosts] },
      })
      values.body = ''
      errors.body = undefined
    }
  )

  return (
    <Form onSubmit={onSubmit} noValidate loading={loading}>
      <Form.Field>
        <Form.Input
          placeholder="Type something about"
          label="Create post:"
          name="body"
          type="text"
          value={values.body}
          onChange={onChange}
          error={errors.body}
        />
      </Form.Field>
      <Button type="submit" primary>
        Create
      </Button>
    </Form>
  )
}

export default PostForm
