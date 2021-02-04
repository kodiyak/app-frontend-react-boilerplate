import {
  Box,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react'
import React from 'react'
import AppButton from '../../../Utils/AppButton'
import Col from '../../../Utils/Col'
import Row from '../../../Utils/Row'
import { useFilesUploader } from '../../../../contexts/FilesUploaderContext'

export interface AdminPageDefaultProps {
  titleLabel: string
  description?: string
  rightContent?: React.ReactNode
}

const AdminPageDefault: React.FC<AdminPageDefaultProps> = ({
  children,
  titleLabel,
  description,
  rightContent,
}) => {
  const [bgTopColor, bgBotColor] = useColorModeValue(
    ['gray.100', 'gray.300'],
    ['gray.700', 'gray.800']
  )
  const [bgTop, bgBot] = useToken('colors', [bgTopColor, bgBotColor])
  const { filesUploaderActives } = useFilesUploader()

  return (
    <Col>
      <Row alignItems="center" bg={`linear-gradient(to left, ${bgTop}, ${bgBot})`}>
        <Col flex={1} p={4}>
          <Heading mb={2}>{titleLabel}</Heading>
          <Text>{description}</Text>
        </Col>
        <Row px={4}>{rightContent && rightContent}</Row>
        {filesUploaderActives.length > 0 && (
          <Col px={4} textAlign="center">
            <Spinner color="primary.400" mx="auto" />
            <Text fontSize="xs" color="primary.200">
              Fazendo Upload
            </Text>
          </Col>
        )}
      </Row>
      <Col>{children}</Col>
    </Col>
  )
}

export default AdminPageDefault
