import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface RedirectIfProps {
  if: boolean
  to: string
}

const RedirectIf: React.FC<RedirectIfProps> = ({ if: condition, to, children }) => {
  const router = useRouter()
  useEffect(() => {
    if (condition === true) {
      router.push(to)
    }
  }, [condition])
  return <>{!condition && children}</>
}

export default RedirectIf
