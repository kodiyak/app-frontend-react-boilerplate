import useSWR from 'swr'
import App from '../../../app/App'
export function useFileSystemTree(dir: string = '/') {
  return useSWR(`fs/${dir}`, () => {
    return App.FileSystem.getTree(dir).then((res) => res.data)
  })
}
