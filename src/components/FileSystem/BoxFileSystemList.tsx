import React, { useState } from 'react'
import Col from '../Utils/Col'
import { useFileSystemTree } from '../../hooks/api/fs/useFileSystemTree'
import Row from '../Utils/Row'
import { Heading, Box, SimpleGrid, Skeleton } from '@chakra-ui/react'
import FileSystemRow from './FileSystemRow'

const BoxFileSystemList: React.FC = () => {
  const [dir, setDir] = useState([''])
  const fileSystemData = useFileSystemTree(dir.join('/'))

  return (
    <Col>
      <Row alignItems="center" py={4}>
        <Heading d="flex" size="lg">
          {dir.map((subDir, keySubdir) => (
            <Box
              onClick={() => {
                setDir((oldDirs) => oldDirs.filter((_, key) => key <= keySubdir))
              }}
              cursor="pointer"
              color={`gray.${keySubdir + 1}00`}
              _hover={{ color: 'primary.500' }}
              key={`subDir${keySubdir}`}
            >
              {subDir}/
            </Box>
          ))}
        </Heading>
      </Row>
      {fileSystemData.isValidating && !fileSystemData.data && (
        <SimpleGrid gap={2}>
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
          <Skeleton rounded="sm" h={8} />
        </SimpleGrid>
      )}
      <SimpleGrid gap={2}>
        {fileSystemData.data?.map((fileSystem) => (
          <Box key={fileSystem.metadata.gid}>
            <FileSystemRow
              onChangeDir={() => {
                setDir((oldDir) => [...oldDir, fileSystem.name])
              }}
              fileSystem={fileSystem}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Col>
  )
}

export default BoxFileSystemList
