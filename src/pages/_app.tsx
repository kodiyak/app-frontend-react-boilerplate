import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect } from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'
import { AuthProvider } from '../contexts/AuthContext'
import { HealthCheckProvider } from '../contexts/HealthCheckContext'
import '../styles/app.css'
import { FilesUploaderProvider } from '../contexts/FilesUploaderContext'
import { RoleProvider } from '../contexts/RoleContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <HealthCheckProvider>
            <FilesUploaderProvider>
              <Component {...pageProps} />
            </FilesUploaderProvider>
          </HealthCheckProvider>
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
