import { HttpClient } from '../HttpClient'
export class FileSystem {
  public Validators = {
    isImage: (file: App.File) => file.mime_type?.startsWith('image'),
    isVideo: (file: App.File) => file.mime_type?.startsWith('video'),
    isZip: (file: App.File) => file.mime_type?.startsWith('application/zip'),
    isJavascript: (file: App.File) => {
      return file.mime_type?.startsWith('application/javascript')
    },
    isText: (file: App.File) => file.mime_type?.startsWith('text/plain'),
  }

  public async getTree(dir: string) {
    return HttpClient.get<App.FileSystem.Main[]>(`/v1/file-system/tree`, {
      params: { dir },
    })
  }

  public async destroy(dir: string) {
    return HttpClient.delete(`/v1/file-system`, {
      params: { dir },
    })
      .then(() => true)
      .catch(() => false)
  }

  public async details(dir: string) {
    return HttpClient.get<App.FileSystem.MainDetails>(`/v1/file-system`, {
      params: { dir },
    })
  }
}
