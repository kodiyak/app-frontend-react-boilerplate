import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const Row: React.FC<BoxProps> = (props) => {
  return <Box d="flex" flexDir="row" {...props} />
}

export default Row
