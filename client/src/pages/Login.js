import { gql } from '@apollo/client'
import { useContext } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const LOGIN_USER_REQUEST = gql`
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

function Login(props) {
  const context = useContext(AuthContext)
  const { loading, onChange, onSubmit, errors, values } = useForm(
    (_, { data: { login: userData } }) => {
      context.login(userData)
      props.history.push('/')
    },
    LOGIN_USER_REQUEST
  )

  return (
    <Container style={{ width: 400 }}>
      <Header as="h1" textAlign="center">
        Login
      </Header>
      <Form onSubmit={onSubmit} noValidate loading={loading}>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export { Login }
export default Login
