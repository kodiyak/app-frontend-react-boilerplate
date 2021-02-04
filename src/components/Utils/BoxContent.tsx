import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const BoxContent: React.FC<BoxProps> = (props) => {
  return (
    <Box d="flex" w="1000px" mx="auto" maxW="100%" flexDir="column" {...props} />
  )
}

export default BoxContent
