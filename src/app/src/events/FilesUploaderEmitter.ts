import EventEmitter from '../extras/EventEmitter'
import { FileUploader } from '../files/FileUploader'

export interface FilesUploaderEvents {
  increment: {
    fileUploader: FileUploader
  }
  decrement: {
    fileUploader: FileUploader
  }
}

export default class FilesUploaderEmitter extends EventEmitter<FilesUploaderEvents> {}
