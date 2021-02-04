import { CloseButton, Heading, ButtonProps, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import AppButton from '../Utils/AppButton'
import Col from '../Utils/Col'
import Row from '../Utils/Row'

export interface FormContainerProps {
  titleLabel: string
  description?: string
  onSubmit?: () => any
  onClose?: () => any
  button?: ButtonProps
  isClosable?: boolean
}

const FormContainer: React.FC<FormContainerProps> = ({
  titleLabel,
  description,
  button,
  onSubmit,
  onClose,
  children,
  isClosable = true,
}) => {
  const [isLoading, setLoading] = useState(false)

  return (
    <Col w="100%">
      <Row py={2} alignItems="center">
        <Col flex={1} pl={4}>
          <Heading size="lg" cursor="default">
            {titleLabel}
          </Heading>
          {description && (
            <Text color="GrayText" fontSize="xs" lineHeight="160%" fontWeight={400}>
              {description}
            </Text>
          )}
        </Col>
        {isClosable && <CloseButton mr={4} ml="auto" onClick={onClose} />}
      </Row>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setLoading(true)
          await onSubmit?.()
          setLoading(false)
        }}
      >
        <Col>{children}</Col>
        <Row flexDir="row-reverse" w="100%" p={4} pt={0}>
          <AppButton
            type="submit"
            isLoading={isLoading}
            colorScheme="green"
            variant="ghost"
            {...button}
          />
        </Row>
      </form>
    </Col>
  )
}

export default FormContainer
