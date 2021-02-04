import { Module } from './src/Module'
import { Auth } from './src/Auth'
import { HealthCheck } from './src/extras/HealthCheck'
import { FileSystem } from './src/files/FileSystem'
import { URL } from './src/URL'
import * as uuid from 'uuid'
import { FilesUploader } from './src/files'
import { WebSocket } from './src/socket/WebSocket'
import constants from '../configs/constants'
import { FileResource } from './src/resources/FileResource'

class App {
  // Extras
  public Auth: Auth = new Auth()
  public HealthCheck = new HealthCheck()
  public URL = new URL()

  // Websockets
  public WebSocket = new WebSocket(constants.app.URL)
  public FileWebSocket = new WebSocket(constants.app.URL + '/uploads')

  // Files
  public FilesUploader = new FilesUploader()
  public FileSystem = new FileSystem()

  // Modules
  public User = new Module<App.User, 'avatar' | 'roles'>('User')
  public Folder = new Module<App.Folder, 'user'>('Folder')
  public File = new Module<App.File, 'folder' | 'user'>('File')
  public Role = new Module<App.Role, 'permissions'>('Role')
  public AppConfig = new Module<App.AppConfig, ''>('AppConfig')
  public Permission = new Module<App.Permission, 'roles'>('Permission')

  // Resources
  public FileResource = FileResource

  public generateUUID() {
    return uuid.v4()
  }

  public async sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds))
  }
}

export default new App()
