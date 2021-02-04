import React from 'react'
import App from '../../../app/App'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage/index'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box, Text, SimpleGrid, Image } from '@chakra-ui/react'
import Col from '../../../components/Utils/Col'
import Row from '../../../components/Utils/Row'
import AppTextarea from '../../../components/Utils/AppTextarea'
import BoxFolderMini from '../../../components/Cards/BoxFolderMini'
import BoxUserMini from '../../../components/Cards/BoxUserMini'
import { useFilesize } from '../../../hooks/helpers/useFilesize'

interface PageProps {
  file: App.File
}

const file: React.FC<PageProps> = ({ file }) => {
  if (!file) {
    return <Box>Carregando...</Box>
  }
  const fileSize = useFilesize(file.size, 'MB')

  return (
    <AdminMasterPage>
      <AdminPageDefault titleLabel={`Arquivo - ${file.filename}`}>
        <SimpleGrid columns={2}>
          <Col>
            <SimpleGrid py={2} columns={2} px={4} gap={4}>
              <Col>
                <Text fontSize="xs" cursor="default" fontWeight={800} mb={2}>
                  Pasta
                </Text>
                <BoxFolderMini folder={file.folder} />
              </Col>
              <Col>
                <Text fontSize="xs" cursor="default" fontWeight={800} mb={2}>
                  Upload por
                </Text>
                <BoxUserMini user={file.user} />
              </Col>
            </SimpleGrid>
          </Col>
          <Col px={4} pt={2}>
            <Box
              w="100%"
              minH={140}
              bg="black"
              rounded="lg"
              mb={6}
              overflow="hidden"
            >
              {App.FileSystem.Validators.isImage(file) && (
                <Image
                  w="100%"
                  maxH={450}
                  objectFit="contain"
                  src={App.URL.createFileUrl(file)}
                />
              )}
              {App.FileSystem.Validators.isVideo(file) && (
                <Box
                  as="video"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  controls
                  autoPlay
                  src={App.URL.createFileUrl(file)}
                />
              )}
            </Box>
            <Row p={2}>
              <Text fontWeight="bold" w={150}>
                Tamanho
              </Text>
              <Text ml={2}>{fileSize.replace('.', ',')} MB</Text>
            </Row>
            <Row p={2}>
              <Text fontWeight="bold" w={150}>
                Mime Type
              </Text>
              <Text ml={2}>{file.mime_type}</Text>
            </Row>
            <Row p={2}>
              <Text fontWeight="bold" w={150}>
                Original Name
              </Text>
              <Text ml={2}>{file.original_filename}</Text>
            </Row>
            <Col p={2}>
              <Text fontWeight="bold" mb={1}>
                Descrição
              </Text>
              <AppTextarea defaultValue={file.description} />
            </Col>
          </Col>
        </SimpleGrid>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default file

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const uuid = context.params.uuid as string

  const [file] = await App.File.get({
    fields: ['*'],
    eq: {
      uuid,
    },
    includes: {
      folder: {
        fields: ['*'],
      },
      user: {
        fields: ['*'],
        includes: {
          avatar: { fields: ['*'] },
        },
      },
    },
  }).then((res) => res.data)

  return {
    props: { file },
    revalidate: 60,
  }
}
