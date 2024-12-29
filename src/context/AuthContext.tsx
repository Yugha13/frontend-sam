import { createContext, useContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface User {
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (token: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const login = async (token: string) => {
    try {
      // Assuming your backend returns user data along with the token
      const response = await axios.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setUser(response.data)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        withCredentials: true
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsAuthenticated(false)
      setUser(null)
      navigate('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 