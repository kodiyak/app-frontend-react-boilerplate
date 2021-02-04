import { Circle, Collapse, Progress, Text, Tooltip, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FileUploader } from '../../app/src/files/FileUploader'
import { FileIcon } from '../Icons'
import Col from '../Utils/Col'
import Row from '../Utils/Row'

interface BoxFileUploaderMiniProps {
  fileUploader: FileUploader
}

const BoxFileUploaderMini: React.FC<BoxFileUploaderMiniProps> = ({
  fileUploader,
}) => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(fileUploader.getProgress())
    fileUploader.events.on('data', ({ progressEvent }) => {
      setProgress(fileUploader.getProgress())
    })

    return () => {
      // fileUploader.events.off('data')
    }
  }, [])

  return (
    <Col role="group">
      <Tooltip label={fileUploader.fileData.filename}>
        <Box>
          <Row>
            <Circle
              size={14}
              border="2px solid transparent"
              borderColor={progress < 100 ? 'blue.500' : 'green.500'}
            >
              <FileIcon size={24} />
            </Circle>
            <Col flex={1} pl={2}>
              <Text fontSize="xs">{fileUploader.fileData.original_filename}</Text>
              <Text fontSize="xs" color="GrayText">
                {fileUploader.fileData.mime_type}
              </Text>
            </Col>
          </Row>
        </Box>
      </Tooltip>
      <Collapse in={progress < 100 && progress > 4}>
        <Row pt={2}>
          <Progress
            value={progress}
            h={1}
            colorScheme="primary"
            rounded="lg"
            w="100%"
          />
        </Row>
      </Collapse>
    </Col>
  )
}

export default BoxFileUploaderMini
