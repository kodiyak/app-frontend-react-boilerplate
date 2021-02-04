import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const Col: React.FC<BoxProps> = (props) => {
  return <Box d="flex" flexDir="column" {...props} />
}

export default Col
