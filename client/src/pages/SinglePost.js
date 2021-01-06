import { useQuery } from '@apollo/client'
import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { Card, Grid, Image, Transition } from 'semantic-ui-react'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import { GET_POST_REQUEST } from '../utils/graphql'

const SinglePost = (props) => {
  const { postId } = props.match.params
  const { user } = useContext(AuthContext)
  const { data: { getPost } = {} } = useQuery(GET_POST_REQUEST, {
    variables: { postId },
  })
  const deletePostCallback = () => {
    props.history.push('/')
  }

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
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
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
