import { TextareaProps, Textarea } from '@chakra-ui/react'
import React from 'react'

const AppTextarea: React.FC<TextareaProps> = (props) => {
  return (
    <Textarea
      variant="filled"
      _focus={{ bg: 'gray.600' }}
      _hover={{ bg: 'gray.700' }}
      rounded="sm"
      bg="gray.700"
      {...props}
    />
  )
}

export default AppTextarea
