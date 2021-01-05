import { useContext } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { REGISTER_USER_MUTATION, useForm } from '../utils'

function Register(props) {
  const context = useContext(AuthContext)
  const { loading, onChange, onSubmit, errors, values } = useForm(
    REGISTER_USER_MUTATION,
    {
      username: '',
      email: '',
      password: '',
    },
    (_, { data: { register: userData } }) => {
      context.login(userData)
      props.history.push('/')
    }
  )

  return (
    <Container style={{ width: 400 }}>
      <Header as="h1" textAlign="center">
        Register
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
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          error={errors.email}
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
          Register
        </Button>
      </Form>
    </Container>
  )
}

export { Register }
export default Register
