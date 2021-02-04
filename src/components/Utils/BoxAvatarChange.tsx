import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import App from '../../app/App'
import BoxFile, { BoxFileProps } from './BoxFile'
import { FileUploader } from '../../app/src/files/FileUploader'

interface BoxAvatarChangeProps extends BoxFileProps {
  src: string
  onUploadChangeFile: (fileUploader: FileUploader) => any
}

const BoxAvatarChange: React.FC<BoxAvatarChangeProps> = ({
  src,
  onUploadChangeFile,
  ...props
}) => {
  const [file, setFile] = useState<File>()

  useEffect(() => {
    if (file) {
      App.AppConfig.get({
        fields: ['value'],
        eq: {
          key: 'app:folders:avatar',
        },
        limit: 1,
      }).then(({ data: [appConfig] }) => {
        App.Folder.get({
          fields: ['*'],
          limit: 1,
          eq: { id: appConfig.value },
        }).then(async ({ data: [folder] }) => {
          const [fileUpload] = await App.FilesUploader.open([file], folder)
          await fileUpload.upload()
          onUploadChangeFile?.(fileUpload)
        })
      })
    }
  }, [file])

  return (
    <BoxFile
      {...props}
      input={{
        onChange: (e) => {
          setFile(e.target.files[0])
        },
      }}
    >
      <Image w="100%" h="100%" objectFit="cover" src={src} />
    </BoxFile>
  )
}

export default BoxAvatarChange
