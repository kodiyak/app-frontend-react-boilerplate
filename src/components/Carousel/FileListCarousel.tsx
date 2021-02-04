import { SimpleGrid, Box } from '@chakra-ui/react'
import React from 'react'
import BoxCarousel, { CarouselRow } from '../Utils/BoxCarousel'
import { useArrayChunk } from '../../hooks/helpers/useArrayChunk'
import BoxFileMedium from '../Cards/BoxFileMedium'

interface FileListCarouselProps {
  files: App.File[]
}

const FileListCarousel: React.FC<FileListCarouselProps> = ({ files }) => {
  const filesChunked = useArrayChunk(files, 3)
  return (
    <BoxCarousel countSliders={filesChunked.length}>
      {filesChunked.map((filesRow, keyRow) => (
        <CarouselRow
          h={48}
          key={`fileRow${keyRow}`}
          overflow="hidden"
          flexShrink={0}
          px={20}
        >
          <SimpleGrid h="100%" columns={3} pr={4} overflow="hidden">
            {filesRow.map((file, keyFile) => (
              <Box h="100%" key={`fileBox${keyRow}${keyFile}`}>
                <BoxFileMedium file={file} />
              </Box>
            ))}
          </SimpleGrid>
        </CarouselRow>
      ))}
    </BoxCarousel>
  )
}

export default FileListCarousel
