import { Box, Text, FormLabel, BoxProps } from '@chakra-ui/react'
import React from 'react'
import Row from '../Utils/Row'

interface FormRowProps extends BoxProps {
  label: string
  labelWidth?: number
  isRequired?: boolean
}

const FormRow: React.FC<FormRowProps> = ({
  label,
  isRequired,
  labelWidth = 150,
  children,
  ...rest
}) => {
  return (
    <Row alignItems="center" role="group" mb={4} {...rest}>
      <Box w={labelWidth} px={2}>
        <FormLabel textAlign="right" fontSize="sm" fontWeight="bold" m={0}>
          {label}
        </FormLabel>
      </Box>
      <Box flex={1} pr={!isRequired ? 4 : 0}>
        {children}
      </Box>
      {isRequired && (
        <Box
          px={2}
          color="GrayText"
          fontSize="xs"
          _groupHover={{ color: 'red.300' }}
        >
          Obrigatório
        </Box>
      )}
    </Row>
  )
}

export default FormRow
