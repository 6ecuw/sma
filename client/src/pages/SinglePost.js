import { useQuery } from '@apollo/client'
import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { Button, Card, Form, Grid, Image, Transition } from 'semantic-ui-react'
import CommentButton from '../components/CommentButton'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils'
import { CREATE_COMMENT_MUTATION, GET_POST_REQUEST } from '../utils/graphql'

const SinglePost = (props) => {
  const { postId } = props.match.params
  const { user } = useContext(AuthContext)
  const { data: { getPost } = {} } = useQuery(GET_POST_REQUEST, {
    variables: { postId },
  })
  const deletePostCallback = () => {
    props.history.push('/')
  }
  const { loading, values, errors, onChange, onSubmit } = useForm(
    CREATE_COMMENT_MUTATION,
    { postId, body: '' },
    () => {
      values.body = ''
      errors.body = undefined
    }
  )

  let singlePost

  if (getPost) {
    const {
      id,
      body,
      username,
      createdAt,
      likes,
      likeCount,
      comments,
      commentCount,
    } = getPost

    singlePost = (
      <Transition>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}
                  </Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likes, likeCount }} />
                  <CommentButton post={{ id, commentCount }} />
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <Form onSubmit={onSubmit} noValidate loading={loading}>
                      <Form.Field>
                        <Form.Input
                          placeholder="Type something about"
                          label="Create comment:"
                          name="body"
                          type="text"
                          value={values.body}
                          onChange={onChange}
                          error={errors.body}
                        />
                      </Form.Field>
                      <Button
                        type="submit"
                        primary
                        disabled={values.body.trim() === ''}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Transition>
    )
  } else {
    singlePost = <h1>Loading...</h1>
  }

  return singlePost
}

export default SinglePost
