import App from '../../App'
import FileReaderEmitter from '../events/FileReaderEmitter'
import socket from 'socket.io'
import { FileUploader } from './FileUploader'
import FilesUploaderEmitter from '../events/FilesUploaderEmitter'

export class FilesUploader {
  public uploaders: FileUploader[] = []
  public events = new FilesUploaderEmitter()

  public async open(files: FileList | File[], folder: App.Folder) {
    const currentUploaders: FileUploader[] = []
    for (const file of files) {
      const fileUploader = new FileUploader(file, folder)
      currentUploaders.push(fileUploader)
      this.uploaders.push(fileUploader)
      await fileUploader.start()
      fileUploader.events.on('end', () => {
        this.events.emit('decrement', { fileUploader })
      })
      this.events.emit('increment', { fileUploader })
    }

    return currentUploaders
  }
}
