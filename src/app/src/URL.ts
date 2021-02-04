import constants from '../../configs/constants'

export class URL {
  public createFileUrl(file?: App.File) {
    return file ? `${constants.app.URL}/v1/file-system/show/${file.uuid}` : ``
  }
}
