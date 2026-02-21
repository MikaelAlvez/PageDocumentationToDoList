import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.getProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('avatar') // limpa avatar órfão
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    localStorage.removeItem('avatar') // garante que não sobra avatar de outro usuário
    const data = await api.login({ email, password })
    localStorage.setItem('token', data.access_token)
    const profile = await api.getProfile()
    setUser(profile)
    return profile
  }

  const register = async (name, email, password) => {
    localStorage.removeItem('avatar')
    const data = await api.register({ name, email, password })
    localStorage.setItem('token', data.access_token)
    const profile = await api.getProfile()
    setUser(profile)
    return profile
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('avatar') // limpa avatar ao sair
    setUser(null)
  }

  const refreshUser = async () => {
    const profile = await api.getProfile()
    setUser(profile)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}