import React, { useEffect } from 'react'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage/index'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import Row from '../../../components/Utils/Row'
import Col from '../../../components/Utils/Col'
import BoxCarousel, { CarouselRow } from '../../../components/Utils/BoxCarousel'
import AdminPageFolder from '../../../components/MasterPages/AdminMasterPage/src/AdminPageFolder'
import { GetStaticPaths, GetStaticProps } from 'next'
import App from '../../../app/App'
import { SimpleGrid, Box } from '@chakra-ui/react'
import FileTester from '../../../components/Utils/FileTester'
import BoxFileMini from '../../../components/Cards/BoxFileMini'
import FileListCarousel from '../../../components/Carousel/FileListCarousel'

interface PageFolderProps {
  folder: App.Folder
}

const page: React.FC<PageFolderProps> = ({ folder }) => {
  if (!folder) {
    return <Box>Carregando...</Box>
  }

  const lastUploadedFiles = App.File.swr({
    fields: ['*'],
    limit: 10,
    eq: {
      folder_id: folder.id,
    },
    sort: {
      created_at: 'desc',
    },
  })
  return (
    <AdminMasterPage>
      <AdminPageFolder folder={folder}>
        {lastUploadedFiles.data && (
          <FileListCarousel files={lastUploadedFiles.data} />
        )}
        <Row mt={4}>
          <App.File.Components.List
            query={{
              fields: ['*'],
              eq: {
                folder_id: folder.id,
              },
            }}
          >
            {({ data: files }: App.Components.List<App.File>) => (
              <SimpleGrid columns={4} gap={4}>
                {files.map((file) => (
                  <Box key={`file${file.id}`}>
                    <BoxFileMini file={file} />
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </App.File.Components.List>
        </Row>
      </AdminPageFolder>
    </AdminMasterPage>
  )
}

export default page

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageFolderProps> = async (context) => {
  const uuid = context.params.uuid as string

  const [folder] = await App.Folder.get({
    fields: ['*'],
    eq: {
      uuid,
    },
  }).then((res) => res.data)

  return {
    props: { folder: folder },
    revalidate: 60,
  }
}
