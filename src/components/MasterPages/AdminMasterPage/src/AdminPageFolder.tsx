import React from 'react'
import BoxCarousel, { CarouselRow } from '../../../Utils/BoxCarousel'
import Col from '../../../Utils/Col'
import Row from '../../../Utils/Row'

import AdminPageDefault, { AdminPageDefaultProps } from './AdminPageDefault'
import { Box, SimpleGrid, Square, Text } from '@chakra-ui/react'
import BoxFile from '../../../Utils/BoxFile'
import { UploadIcon } from '../../../Icons'
import { useFilesUploader } from '../../../../contexts/FilesUploaderContext'
import BoxFileUploaderMini from '../../../FileUploader/BoxFileUploaderMini'

interface AdminPageFolderProps extends Partial<AdminPageDefaultProps> {
  folder: App.Folder
}

const AdminPageFolder: React.FC<AdminPageFolderProps> = ({
  children,
  folder,
  ...rest
}) => {
  const { filesUploader, onChangeFilesHandle } = useFilesUploader()
  return (
    <AdminPageDefault titleLabel={`Pasta ${folder?.name}`} {...rest}>
      <Row overflow="hidden">
        <Col w={250} pl={4} flexShrink={0}>
          <Box my={4}>
            <BoxFile
              w="100%"
              rounded="sm"
              bg="white"
              color="black"
              fontWeight="bold"
              d="flex"
              flexDir="row"
              alignItems="center"
              cursor="pointer"
              userSelect="none"
              transition="all .2s ease-in-out"
              _hover={{ bg: 'primary.400', color: 'white' }}
              input={{
                multiple: true,
                onChange: (e) => {
                  const files = e.target.files
                  onChangeFilesHandle(files, folder)
                },
              }}
            >
              <Square size={14}>
                <UploadIcon size={24} />
              </Square>
              <Col flex={1}>
                <Text>Fazer Upload</Text>
                <Text fontSize="xs">{folder.name}</Text>
              </Col>
            </BoxFile>
          </Box>
          <SimpleGrid gap={2}>
            {filesUploader
              ?.filter((filesUploader) => filesUploader.folder.id === folder.id)
              .map((fileUploader) => (
                <Box key={fileUploader.fileData.uuid}>
                  <BoxFileUploaderMini fileUploader={fileUploader} />
                </Box>
              ))}
          </SimpleGrid>
        </Col>
        <Col flex={1} pl={4} overflow="hidden">
          {children}
        </Col>
      </Row>
    </AdminPageDefault>
  )
}

export default AdminPageFolder
