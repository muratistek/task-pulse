import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, sideBarThemeColor: "#8d69f1", mainThemeColor: "#f4f4f4" }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    case 'SET_SIDEBAR_COLOR':
      return { ...state, sideBarThemeColor: action.payload.sidebarColor }
    case 'SET_MAIN_COLOR':
      return { ...state, mainThemeColor: action.payload.mainColor }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  let sidebarColor = window.localStorage.getItem('sidebarColor')
  let mainTheme = window.localStorage.getItem('mainTheme')

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    sideBarThemeColor: !sidebarColor ? '#8d69f1' : sidebarColor,
    mainThemeColor: !mainTheme || mainTheme !== 'dark' ? '#f4f4f4' : '#1b1b1b'
  })


  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )

}