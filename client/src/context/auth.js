import { decode } from 'jsonwebtoken'
import { createContext, useReducer } from 'react'

const initialState = { user: null }

if (localStorage.getItem('userToken')) {
  const user = decode(localStorage.getItem('userToken'))

  if (user.exp * 1000 < Date.now()) {
    localStorage.removeItem('userToken')
  } else {
    initialState.user = user
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [{ user }, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    localStorage.setItem('userToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    dispatch({ type: 'LOGOUT' })
  }

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />
}

export { AuthContext, AuthProvider }
