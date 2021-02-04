import { SimpleGrid, Box } from '@chakra-ui/react'
import React from 'react'
import BoxUserMini from '../Cards/BoxUserMini'

interface ListUsersMiniProps {
  users: App.User[]
}

const ListUsersMini: React.FC<ListUsersMiniProps> = ({ users }) => {
  return (
    <SimpleGrid columns={4} gap={4}>
      {users.map((user) => (
        <Box
          p={2}
          rounded="md"
          key={`userData${user.id}`}
          transition="all .2s ease-in-out"
          _hover={{ bg: 'gray.900' }}
        >
          <BoxUserMini user={user} />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ListUsersMini
