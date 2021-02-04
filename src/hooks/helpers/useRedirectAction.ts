import { useRouter } from 'next/router'
import constants from '../../configs/constants'

export function useRedirectAction() {
  const router = useRouter()

  const reset = () => {
    localStorage.removeItem(constants.storage.REDIRECT_ACTION)
  }

  const redirect = (secondRouter?: string) => {
    const route = localStorage.getItem(constants.storage.REDIRECT_ACTION)
    if (route) {
      router.push(route)
      reset()
    } else if (secondRouter) {
      router.push(secondRouter)
      reset()
    }
  }

  const set = (route: string) => {
    localStorage.setItem(constants.storage.REDIRECT_ACTION, route)
  }

  return { redirect, set, reset }
}
