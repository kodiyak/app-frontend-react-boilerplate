import { Input, InputProps } from '@chakra-ui/react'
import React from 'react'

const AppInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      variant="filled"
      _focus={{ bg: 'gray.600' }}
      _hover={{ bg: 'gray.700' }}
      rounded="sm"
      bg="gray.700"
      {...props}
    />
  )
}

export default AppInput
