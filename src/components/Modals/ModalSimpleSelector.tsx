import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalProps,
  Heading,
  CloseButton,
  Text,
  Button,
} from '@chakra-ui/react'
import FormSimple, { FormSimpleProps } from '../Forms/FormSimple'
import Row from '../Utils/Row'
import Col from '../Utils/Col'
import AppButton from '../Utils/AppButton'
import { useCollection } from '../../hooks/helpers/useCollection'

interface ModalSimpleSelectorProps {
  titleLabel?: string
  description?: string
  keyDescription?: string
  isMultiple?: boolean
  modal: Partial<ModalProps>
  index: '*' | any
  label: string
  items: any[]
  onChange?: (value: any) => any
  onSubmit?: (value: any) => any
  defaultValue?: any
}

const ModalSimpleSelector: React.FC<ModalSimpleSelectorProps> = ({
  titleLabel,
  description,
  index,
  label,
  keyDescription,
  isMultiple = true,
  items,
  onChange,
  onSubmit,
  modal,
  defaultValue,
}) => {
  const [isLoading, setLoading] = useState(false)
  const [isEnableRequest, setEnableRequest] = useState(false)
  const [isExistsEdition, setExistsEdition] = useState(false)
  const collection = useCollection<any>(defaultValue)
  const onChangeSubmit = async () => {
    setLoading(true)
    await onSubmit?.(collection.data)
    setLoading(false)
  }

  useEffect(() => {
    if (isEnableRequest) {
      console.log('agr editou', collection.data)
      setExistsEdition(true)
    }
  }, [collection.data])

  useEffect(() => {
    if (modal.isOpen) {
      setExistsEdition(false)
      setTimeout(() => setEnableRequest(true), 300)
    } else {
      if (isEnableRequest && isExistsEdition) {
        onChangeSubmit()
      }
      setEnableRequest(false)
      setExistsEdition(false)
    }
  }, [modal.isOpen])

  return (
    <>
      {/* @ts-ignore */}
      <Modal isCentered size="lg" {...modal}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalBody p={0}>
            <Row alignItems="center" p={4}>
              <Col flex={1}>
                <Heading size="md">{titleLabel}</Heading>
                {description && (
                  <Text fontSize="xs" mt={2} color="GrayText">
                    {description}
                  </Text>
                )}
              </Col>
              <CloseButton onClick={modal.onClose} />
            </Row>
            <Col p={2}>
              {items.map((item) => (
                <Row
                  key={`item${item[index]}`}
                  p={2}
                  rounded="sm"
                  alignItems="center"
                  borderBottom="1px solid transparent"
                  borderColor="gray.700"
                  _hover={{ bg: 'gray.700' }}
                >
                  <Col flex={1}>
                    <Text cursor="default" fontSize="sm">
                      {item[label]}
                    </Text>
                    {keyDescription && (
                      <Text fontSize="xs">{item[keyDescription]}</Text>
                    )}
                  </Col>
                  {collection.exists(item[index]) ? (
                    <AppButton
                      ml="auto"
                      size="sm"
                      onClick={() => {
                        collection.remove(item[index])
                      }}
                    >
                      Remover
                    </AppButton>
                  ) : (
                    <AppButton
                      ml="auto"
                      size="sm"
                      bg="primary.500"
                      _hover={{ bg: 'primary.400' }}
                      _active={{ bg: 'primary.600' }}
                      onClick={() => {
                        if (!isMultiple) {
                          collection.reset()
                        }
                        collection.add(item[index])
                      }}
                    >
                      Adicionar
                    </AppButton>
                  )}
                </Row>
              ))}
            </Col>
            {/* <Row p={4} pt={0} flexDir="row-reverse">
              <AppButton
                colorScheme="green"
                variant="ghost"
                isLoading={isLoading}
                onClick={async () => {
                  setLoading(true)
                  await onSubmit?.(collection.data)
                  modal.onClose()
                  setLoading(false)
                }}
              >
                Enviar
              </AppButton>
            </Row> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalSimpleSelector
