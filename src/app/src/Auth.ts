import { HttpClient } from './HttpClient'
import LocalStorage from './extras/LocalStorage'
import AuthEmitter from './events/AuthEmitter'
import { UserResource } from './resources/UserResource'

export interface AuthCredentials {
  email: string
  password: string
}

export class Auth {
  public profile: App.User
  public events = AuthEmitter
  public Resource: UserResource
  private token: string

  constructor() {
    this.events.on('forceRefresh', () => {
      this.authByLocalStorage()
    })
  }

  public async authByCredentials(credentials: AuthCredentials) {
    return HttpClient.post<App.OAuth>(`/oauth`, credentials).then(async (res) => {
      HttpClient.defaults.headers.Authorization = `bearer ${res.data.token}`
      await this.setToken(res.data.token)
      return await this.refreshProfile()
    })
  }

  public async authByLocalStorage() {
    const storageAuth = LocalStorage.get('auth')
    if (storageAuth && storageAuth.token) {
      const token = storageAuth.token
      this.token = token
      HttpClient.defaults.headers.Authorization = `bearer ${token}`

      await this.refreshProfile()
    }
  }

  public async refreshProfile() {
    return await HttpClient.get<App.User>(`/oauth`)
      .then((res) => {
        this.setProfile(res.data)
        LocalStorage.set(`auth`, { token: this.token })
        this.events.emit('login', { user: res.data })
        return res
      })
      .catch(() => {})
  }

  public setProfile(profile: App.User) {
    this.profile = profile
    this.Resource = new UserResource(profile)
  }

  public async logout() {
    delete HttpClient.defaults.headers.Authorization
    this.events.emit('logout', { user: this.profile })
    LocalStorage.destroy('auth')
  }

  public async setToken(token: string) {
    LocalStorage.set('auth', { token: this.token })
    this.token = token

    return this
  }

  public async confirmPassword(password: string) {
    return HttpClient.post<App.Helpers.Success>(`/v1/confirm-password`, {
      confirmPassword: password,
    })
  }
}
