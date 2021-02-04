import { Avatar, Circle, Text } from '@chakra-ui/react'
import React from 'react'
import Row from '../Utils/Row'
import Col from '../Utils/Col'
import { FolderIcon } from '../Icons'
import Link from 'next/link'

interface BoxFolderMiniProps {
  folder: App.Folder
}

const BoxFolderMini: React.FC<BoxFolderMiniProps> = ({ folder }) => {
  return (
    <Link href={`/admin/folder/${folder.uuid}`}>
      <Row alignItems="center" role="group" cursor="pointer" userSelect="none">
        <Circle bg="gray.500" size={14} _groupHover={{ bg: 'primary.500' }}>
          <FolderIcon size={20} />
        </Circle>
        <Col px={4} flex={1}>
          <Text fontSize="sm" fontWeight="bold">
            {folder.name}
          </Text>
          <Text fontSize="xs" color="GrayText">
            {folder.uuid}
          </Text>
        </Col>
      </Row>
    </Link>
  )
}

export default BoxFolderMini
