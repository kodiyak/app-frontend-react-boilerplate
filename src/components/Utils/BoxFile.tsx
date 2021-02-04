import { Box, BoxProps, Input, InputProps } from '@chakra-ui/react'
import React, { useRef } from 'react'

export interface BoxFileProps extends BoxProps {
  input?: InputProps
}

const BoxFile: React.FC<BoxFileProps> = ({ input, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Box
      pos="relative"
      onClick={() => {
        inputRef.current?.click()
      }}
    >
      <Input
        type="file"
        left={0}
        top={0}
        pos="absolute"
        w="0"
        h="0"
        userSelect="none"
        cursor="pointer"
        ref={inputRef}
        opacity={0}
        overflow="hidden"
        {...input}
      />
      <Box {...rest} />
    </Box>
  )
}

export default BoxFile
