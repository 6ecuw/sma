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

export const GET_POST_REQUEST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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
export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
