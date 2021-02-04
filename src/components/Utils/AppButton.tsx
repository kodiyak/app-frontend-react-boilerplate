import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

const AppButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      rounded="sm"
      fontSize="xs"
      textTransform="uppercase"
      fontWeight="bold"
      fontFamily="sans-serif"
      {...props}
    />
  )
}

export default AppButton
