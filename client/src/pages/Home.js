import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { PostCard } from '../components'

const GET_POSTS_REQUEST = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likes {
        username
      }
      likeCount
    }
  }
`

function Home() {
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
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id}>
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
