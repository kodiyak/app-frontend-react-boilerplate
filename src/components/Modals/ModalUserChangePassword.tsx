import { Box, Heading, Input, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import ModalFormCheckPassword from './ModalFormCheckPassword'
import Col from '../Utils/Col'
import AppInput from '../Utils/AppInput'
import App from '../../app/App'
import Row from '../Utils/Row'
import AppButton from '../Utils/AppButton'
import { useAuth } from '../../contexts/AuthContext'

interface ModalUserChangePasswordProps {
  user: App.User
  isOpen: boolean
  onClose: () => any
}

const ModalUserChangePassword: React.FC<ModalUserChangePasswordProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false)
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const { auth } = useAuth()
  const onSubmitChangePassword = () => {
    setLoading(true)
    App.User.update({
      id: user.id,
      password: inputPasswordRef.current?.value,
    }).finally(() => {
      setLoading(false)
      onClose()

      if (auth.id === user.id) {
        App.Auth.events.emit('forceRefresh')
      }
    })
  }

  return (
    <ModalFormCheckPassword
      modal={{
        isOpen: isOpen,
        onClose: onClose,
      }}
    >
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault()
          onSubmitChangePassword()
        }}
      >
        <Col w="100%" pt={4}>
          <Heading size="lg" mb={4}>
            Nova Senha
          </Heading>
          <Input
            mt={4}
            rounded="sm"
            focusBorderColor="primary.400"
            variant="filled"
            type="password"
            ref={inputPasswordRef}
          />
          <Row flexDir="row-reverse" mt={2}>
            <AppButton
              isLoading={isLoading}
              type="submit"
              bg="primary.500"
              _hover={{ bg: 'primary.400' }}
            >
              Alterar Senha
            </AppButton>
          </Row>
        </Col>
      </form>
    </ModalFormCheckPassword>
  )
}

export default ModalUserChangePassword
