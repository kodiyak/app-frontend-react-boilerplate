import constants from '../../../configs/constants'
import App from '../../App'

export class FileResource {
  constructor(public file: App.File) {}

  public async destroy() {
    return App.FileSystem.destroy(
      `${constants.app.DIR_FILES}/${this.file.filename}`
    ).then((isDestroyed) => {
      if (isDestroyed) {
        return App.File.delete(this.file)
      }
    })
  }
}
