import { Box, Circle, Square, Text } from '@chakra-ui/react'
import React from 'react'
import { FileIcon, FolderIcon } from '../Icons'
import Col from '../Utils/Col'
import Row from '../Utils/Row'

interface FileSystemRowProps {
  fileSystem: App.FileSystem.Main
  onChangeDir?: (fileSystem: App.FileSystem.Main) => any
  onChangeFile?: (fileSystem: App.FileSystem.Main) => any
}

const FileSystemRow: React.FC<FileSystemRowProps> = ({
  fileSystem,
  onChangeDir,
  onChangeFile,
}) => {
  return (
    <Row
      alignItems="center"
      role="group"
      cursor="pointer"
      onClick={() => {
        if (fileSystem.isDirectory) {
          onChangeDir?.(fileSystem)
        } else {
          onChangeFile?.(fileSystem)
        }
      }}
    >
      <Square
        size={8}
        rounded="sm"
        mr={4}
        _groupHover={{ bg: 'primary.500', color: 'white' }}
      >
        {fileSystem.isDirectory ? <FolderIcon /> : <FileIcon />}
      </Square>
      <Col>
        <Text fontSize="xs">{fileSystem.name}</Text>
      </Col>
    </Row>
  )
}

export default FileSystemRow
