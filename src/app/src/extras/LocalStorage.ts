import constants from '../../../configs/constants'

class LocalStorage {
  public get(key: string) {
    const data = localStorage.getItem(`${constants.app.KEY}@${key}`)
    if (!data) return data

    return JSON.parse(data)
  }

  public set(key: string, value: any) {
    return localStorage.setItem(`${constants.app.KEY}@${key}`, JSON.stringify(value))
  }

  public destroy(key: string) {
    return localStorage.removeItem(`${constants.app.KEY}@${key}`)
  }
}

export default new LocalStorage()
