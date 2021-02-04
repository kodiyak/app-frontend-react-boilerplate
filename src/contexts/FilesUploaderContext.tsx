import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  useMemo,
} from 'react'
import App from '../app/App'
import { FileUploader } from '../app/src/files/FileUploader'

interface FilesUploaderContextProps {
  filesUploader: FileUploader[]
  filesUploaded: FileUploader[]
  filesUploaderActives: FileUploader[]
  onChangeFilesHandle: (files: FileList, folder: App.Folder) => void
}

export const FilesUploaderContext = createContext({} as FilesUploaderContextProps)

export const FilesUploaderProvider: React.FC = ({ children }) => {
  const [filesUploader, setFilesUploader] = useState<FileUploader[]>([])
  const [filesUploaded, setFilesUploaded] = useState<FileUploader[]>([])

  const filesUploaderActives = useMemo(() => {
    const filesUploadedIDS = filesUploaded.map(
      (fileUploaded) => fileUploaded.fileData.uuid
    )
    return filesUploader.filter(
      (fileUpload) => !filesUploadedIDS.includes(fileUpload.fileData.uuid)
    )
  }, [filesUploader, filesUploaded])

  useEffect(() => {
    App.FilesUploader.events.on('increment', ({ fileUploader }) => {
      setFilesUploader((oldFilesUploaders) => [...oldFilesUploaders, fileUploader])
    })
    App.FilesUploader.events.on('decrement', ({ fileUploader }) => {
      setFilesUploaded((oldFilesUploaded) => [...oldFilesUploaded, fileUploader])
    })
  }, [])

  const onChangeFilesHandle = (files: FileList, folder: App.Folder) => {
    App.FilesUploader.open(files, folder).then(() => {
      for (const fileUploader of App.FilesUploader.uploaders) {
        fileUploader.upload()
      }
    })
  }

  return (
    <FilesUploaderContext.Provider
      value={{
        filesUploader,
        filesUploaded,
        filesUploaderActives,
        onChangeFilesHandle,
      }}
    >
      {children}
    </FilesUploaderContext.Provider>
  )
}

export function useFilesUploader() {
  return useContext(FilesUploaderContext)
}
