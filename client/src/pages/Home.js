import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { PostCard } from '../components'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'
import { GET_POSTS_REQUEST } from '../utils/graphql'

function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    GET_POSTS_REQUEST
  )

  return (
    <>
      <Header as="h1" textAlign="center">
        Recent Posts
      </Header>
      <Grid columns={3}>
        <Grid.Row>
          {user && (
            <Grid.Column key={user.id}>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </>
  )
}

export { Home }
export default Home
