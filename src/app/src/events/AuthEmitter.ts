import EventEmitter from '../extras/EventEmitter'

export interface UploadClientEvent {
  login: {
    user: App.User
  }
  logout: {
    user: App.User
  }
  forceRefresh: undefined
}

class AuthEmitter extends EventEmitter<UploadClientEvent> {}

export default new AuthEmitter()
