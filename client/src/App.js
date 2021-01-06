import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import { MenuBar } from './components'
import { AuthProvider } from './context/auth'
import { Home, Login, Register } from './pages'
import SinglePost from './pages/SinglePost'
import AuthRoute from './utils/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
