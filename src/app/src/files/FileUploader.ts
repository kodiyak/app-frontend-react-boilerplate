import App from '../../App'
import FileReaderEmitter from '../events/FileReaderEmitter'
import mime from 'mime-types'
import * as uuid from 'uuid'

export class FileUploader {
  public read = 0
  public readUnit = 1000 * 1000
  public isReading = true
  public fileData: App.File
  public reader = new FileReader()
  public events = new FileReaderEmitter()

  constructor(public file: File, public folder: App.Folder) {}

  public async start() {
    const mimeType = mime.lookup(this.file.name) || undefined
    const extension = mime.extension(mimeType) || undefined
    this.fileData = await App.File.create(
      {
        filename: `${extension}/${App.Auth.profile.id}/${uuid.v4()}.${extension}`,
        size: this.file.size,
        mime_type: mimeType,
        original_filename: this.file.name,
        folder_id: this.folder.id,
        user_id: App.Auth.profile.id,
        extension,
      },
      { uuid: true }
    ).then(({ data }) => data[0])
  }

  public async upload() {
    return new Promise((resolve) => {
      this.stream(async (chunk) => {
        // Chunk Processor
        App.FileWebSocket.io.emit('data', {
          blob: chunk,
          uuid: this.fileData.uuid,
          name: this.fileData.filename,
        })

        return await new Promise((resolve) => {
          const resolveAction = async ({ uuid }) => {
            await App.sleep(5000)
            if (uuid === this.fileData.uuid) {
              App.FileWebSocket.io.off('more', resolveAction)
              resolve()
            }
          }
          App.FileWebSocket.io.on('more', resolveAction)
        })
      })

      this.events.on('data', ({ progressEvent }) => {
        console.log(
          'data',
          progressEvent,
          (100 * this.read) / this.file.size,
          `${this.file.size - this.read} Bytes Restantes...`
        )
      })
      this.events.on('end', resolve)
    })
  }

  public stream(
    handler?: (
      chunk: Blob,
      progressEvent: ProgressEvent<FileReader>
    ) => Promise<void>
  ) {
    this.reader.readAsArrayBuffer(this.getBlob())

    this.events.emit('start', { fileUploader: this })

    this.reader.onload = async (progressEvent) => {
      this.isReading = this.read < this.file.size

      if (this.isReading) {
        const blob = this.getBlob()
        this.read =
          this.read + progressEvent.loaded < this.file.size
            ? this.read + progressEvent.loaded
            : this.file.size
        this.events.emit('data', { progressEvent, fileUploader: this })
        await handler?.(blob, progressEvent)

        this.reader.readAsArrayBuffer(blob)
      } else {
        this.events.emit('end', { progressEvent, fileUploader: this })
      }
    }
  }

  private getBlob() {
    return this.file.slice(this.read, this.read + this.readUnit)
  }

  public getProgress() {
    return (this.read * 100) / this.file.size
  }
}
