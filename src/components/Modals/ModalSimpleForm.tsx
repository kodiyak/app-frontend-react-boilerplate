import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalProps,
} from '@chakra-ui/react'
import FormSimple, { FormSimpleProps } from '../Forms/FormSimple'

interface ModalSimpleFormProps {
  modal?: Partial<ModalProps>
  form: FormSimpleProps
  defaultValue?: any
}

const ModalSimpleForm: React.FC<ModalSimpleFormProps> = ({
  children,
  modal,
  form,
}) => {
  return (
    // @ts-ignore
    <Modal isCentered size="lg" {...modal}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalBody p={0}>
          <FormSimple onClose={modal.onClose} {...form} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalSimpleForm
