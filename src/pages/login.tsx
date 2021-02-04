import React from 'react'
import LoginPage from '../components/Pages/LoginPage'
import RedirectIf from '../components/Utils/RedirectIf'
import { useAuth } from '../contexts/AuthContext'

const login: React.FC = () => {
  const { isAuth } = useAuth()
  return (
    <RedirectIf if={isAuth} to="/admin">
      <LoginPage />
    </RedirectIf>
  )
}

export default login
