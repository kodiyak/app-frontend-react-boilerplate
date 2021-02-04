import React, { useEffect, useRef, useState } from 'react'
import MinimalistWallpaper from '../Utils/MinimalistWallpaper'
import BoxOverlay from '../Utils/BoxOverlay'
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps,
  Text,
  Input,
  Heading,
  ScaleFade,
} from '@chakra-ui/react'
import Col from '../Utils/Col'
import AppInput from '../Utils/AppInput'
import ModalHeaderMinimalist from './ModalHeaderMinimalist'
import AppButton from '../Utils/AppButton'
import Row from '../Utils/Row'
import App from '../../app/App'

interface ModalFormCheckPasswordProps {
  modal: Partial<ModalProps>
  onConfirm?: () => any
  onError?: () => any
}

const ModalFormCheckPassword: React.FC<ModalFormCheckPasswordProps> = ({
  children,
  modal,
  onConfirm,
  onError,
}) => {
  const [isLoading, setLoading] = useState(false)
  const [showContent, setShow] = useState(false)
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const onSubmitConfirmPassword = () => {
    setLoading(true)
    App.Auth.confirmPassword(inputPasswordRef.current?.value)
      .then((res) => {
        onConfirm?.()
        setShow(true)
        console.log(res.data)
      })
      .catch(() => {
        onError?.()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (modal.isOpen) {
      setShow(false)
      setLoading(false)
    }
  }, [modal.isOpen])

  return (
    <ModalHeaderMinimalist
      header={
        <Col w="100%">
          {!showContent && (
            <ScaleFade in={!showContent} initialScale={0.8}>
              <Col px={10} pt={4}>
                <Heading size="lg" mb={4}>
                  Confirmar Senha
                </Heading>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    onSubmitConfirmPassword()
                  }}
                >
                  <Input
                    mt={4}
                    rounded="sm"
                    focusBorderColor="primary.400"
                    variant="filled"
                    type="password"
                    ref={inputPasswordRef}
                  />
                  <Row pt={2} flexDir="row-reverse" w="100%">
                    <AppButton
                      isLoading={isLoading}
                      type="submit"
                      bg="primary.500"
                      _hover={{ bg: 'primary.400' }}
                    >
                      Confirmar senha
                    </AppButton>
                  </Row>
                </form>
              </Col>
            </ScaleFade>
          )}
          {showContent && (
            <ScaleFade in={showContent} initialScale={1.4}>
              <Col px={10} w="100%">
                {children}
              </Col>
            </ScaleFade>
          )}
        </Col>
      }
      modal={modal}
    >
      <></>
    </ModalHeaderMinimalist>
  )
}

export default ModalFormCheckPassword
