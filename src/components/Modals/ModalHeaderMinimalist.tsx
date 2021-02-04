import React from 'react'
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
} from '@chakra-ui/react'
import Col from '../Utils/Col'
import AppInput from '../Utils/AppInput'

interface ModalHeaderMinimalistProps {
  header: React.ReactNode
  modal: Partial<ModalProps>
}

const ModalHeaderMinimalist: React.FC<ModalHeaderMinimalistProps> = ({
  children,
  modal,
  header,
}) => {
  return (
    // @ts-ignore
    <Modal isCentered {...modal}>
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        border="2px solid transparent"
        borderColor="primary.700"
      >
        <Box
          roundedTop="md"
          bg="gray.900"
          d="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          pos="relative"
          h={40}
        >
          <MinimalistWallpaper pos="relative" zIndex={5} />
          <BoxOverlay bg="rgba(0,0,0,.8)">{header}</BoxOverlay>
        </Box>
        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalHeaderMinimalist
