import { Button, Form, Header } from 'semantic-ui-react'
import { CREATE_POST_MUTATION, GET_POSTS_REQUEST, useForm } from '../utils'

const PostForm = () => {
  const { onSubmit, onChange, values } = useForm(
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
    }
  )

  return (
    <Form onSubmit={onSubmit}>
      <Header as="h2">Create a new post</Header>
      <Form.Field>
        <Form.Input
          placeholder="Type something about"
          name="body"
          value={values.body}
          onChange={onChange}
        />
      </Form.Field>
      <Button type="submit" primary>
        Create
      </Button>
    </Form>
  )
}

export default PostForm
