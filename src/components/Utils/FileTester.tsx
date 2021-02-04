import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import App from '../../app/App'

const FileTester: React.FC = () => {
  const [files, setFiles] = useState<FileList>()

  useEffect(() => {
    if (files) {
      console.log('files', files)
      App.FilesUploader.open(files, { id: 1 }).then(() => {
        for (const fileUploader of App.FilesUploader.uploaders) {
          fileUploader.events.on('data', ({ fileUploader, progressEvent }) => {
            console.log('file uploeader', progressEvent)
          })
          fileUploader.upload().then(() => {
            console.log('Arquivo ok aqui ó', fileUploader.fileData)
          })
        }
      })
    }
  }, [files])

  return (
    <Box>
      <Input
        type="file"
        onChange={(e) => {
          setFiles(e.target.files)
        }}
      />
    </Box>
  )
}

export default FileTester
