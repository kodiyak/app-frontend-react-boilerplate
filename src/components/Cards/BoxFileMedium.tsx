import { Heading, Square, Text } from '@chakra-ui/react'
import React from 'react'
import App from '../../app/App'
import { FileIcon } from '../Icons'
import Col from '../Utils/Col'
import Row from '../Utils/Row'

interface BoxFileMediumProps {
  file: App.File
}

const BoxFileMedium: React.FC<BoxFileMediumProps> = ({ file }) => {
  return (
    <Col
      role="group"
      h="100%"
      bg={`url(${App.URL.createFileUrl(file)})`}
      backgroundSize="cover"
      backgroundPosition="center center"
    >
      <Row h="100%" alignItems="center" bg={`rgba(0,0,0,.8)`} px={2}>
        <Square
          size={14}
          bg="gray.500"
          _groupHover={{ bg: 'primary.300' }}
          rounded="md"
        >
          <FileIcon size={32} />
        </Square>
        <Col flex={1} pl={4}>
          <Heading
            w="100%"
            textAlign="left"
            size="md"
            _groupHover={{ color: 'primary.200' }}
          >
            {file.filename}
          </Heading>
          <Text fontSize="xs" color="GrayText" w="100%" textAlign="left" size="xs">
            {file.original_filename}
          </Text>
        </Col>
      </Row>
    </Col>
  )
}

export default BoxFileMedium
