import { Avatar, Circle, IconButton, Text, CloseButton } from '@chakra-ui/react'
import React from 'react'
import Row from '../Utils/Row'
import Col from '../Utils/Col'
import { FileIcon } from '../Icons'
import Link from 'next/link'
import { truncate } from '../../helpers/truncate'
import App from '../../app/App'

interface BoxFileMiniProps {
  file: App.File
  onDelete?: () => any
}

const BoxFileMini: React.FC<BoxFileMiniProps> = ({ file, onDelete }) => {
  return (
    <Row
      alignItems="center"
      role="group"
      cursor="pointer"
      userSelect="none"
      flexShrink={0}
      flexGrow={0}
    >
      <Link href={`/admin/file/${file.uuid}`}>
        <Row flex={1}>
          {file.mime_type?.startsWith('image') ? (
            <Avatar src={App.URL.createFileUrl(file)} />
          ) : (
            <Circle bg="gray.500" size={14} _groupHover={{ bg: 'primary.300' }}>
              <FileIcon size={20} />
            </Circle>
          )}
          <Col px={4} flex={1}>
            <Text fontSize="xs" fontWeight="bold">
              {truncate(file.filename, 30)}
            </Text>
            <Text fontSize="xs" color="GrayText">
              {file.uuid}
            </Text>
          </Col>
        </Row>
      </Link>
      <CloseButton
        onClick={() => {
          const fileResource = new App.FileResource(file)
          fileResource.destroy().then(() => {
            onDelete?.()
          })
        }}
      />
    </Row>
  )
}

export default BoxFileMini
