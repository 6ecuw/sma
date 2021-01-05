import { gql } from '@apollo/client'

export const GET_POSTS_REQUEST = gql`
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
export const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      email
      username
      createdAt
    }
  }
`

export const REGISTER_USER_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      id
      email
      token
      username
      createdAt
    }
  }
`

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`
