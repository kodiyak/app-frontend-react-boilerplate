import EventEmitter from '../extras/EventEmitter'
import { FileUploader } from '../files/FileUploader'

export interface UploadClientEvent {
  start: {
    fileUploader: FileUploader
  }
  error: {
    fileUploader: FileUploader
  }
  end: {
    progressEvent: ProgressEvent<FileReader>
    fileUploader: FileUploader
  }
  data: {
    progressEvent: ProgressEvent<FileReader>
    fileUploader: FileUploader
  }
}

export default class FileReaderEmitter extends EventEmitter<UploadClientEvent> {}
