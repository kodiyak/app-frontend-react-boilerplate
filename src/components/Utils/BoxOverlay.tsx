import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const BoxOverlay: React.FC<BoxProps> = (props) => {
  return (
    <Box
      d="flex"
      flexDir="row"
      pos="absolute"
      w="100%"
      h="100%"
      zIndex={10}
      left={0}
      top={0}
      {...props}
    />
  )
}

export default BoxOverlay
