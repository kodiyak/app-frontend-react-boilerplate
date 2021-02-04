import { SimpleGrid, Box } from '@chakra-ui/react'
import React from 'react'
import BoxFolderMini from '../Cards/BoxFolderMini'

interface ListFoldersMiniProps {
  folders: App.Folder[]
}

const ListFoldersMini: React.FC<ListFoldersMiniProps> = ({ folders }) => {
  return (
    <SimpleGrid columns={4} gap={4}>
      {folders.map((folder) => (
        <Box
          p={2}
          rounded="md"
          key={`folderData${folder.id}`}
          transition="all .2s ease-in-out"
          _hover={{ bg: 'gray.900' }}
        >
          <BoxFolderMini folder={folder} />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ListFoldersMini
