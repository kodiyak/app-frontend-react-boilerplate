import React from 'react'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage'
import Col from '../../../components/Utils/Col'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import Row from '../../../components/Utils/Row'
import { Heading, SimpleGrid, Square, useDisclosure } from '@chakra-ui/react'
import FormUserUpdate from '../../../components/FormsDatas/FormUserUpdate'
import AppButton from '../../../components/Utils/AppButton'
import ModalUserChangePassword from '../../../components/Modals/ModalUserChangePassword'
import { useAuth } from '../../../contexts/AuthContext'
import BoxAvatarChange from '../../../components/Utils/BoxAvatarChange'
import App from '../../../app/App'

const profile: React.FC = () => {
  const modalPasswordDisclosure = useDisclosure()
  const { auth } = useAuth()
  return (
    <AdminMasterPage>
      <AdminPageDefault titleLabel="Editar Perfil">
        <BoxContent>
          <Row alignItems="center">
            <BoxAvatarChange
              onUploadChangeFile={async (fileUpload) => {
                const fileId = fileUpload.fileData.id
                await App.User.update({ id: auth.id, file_avatar_id: fileId }).then(
                  () => {
                    App.Auth.events.emit('forceRefresh')
                  }
                )
              }}
              src={App.URL.createFileUrl(auth.avatar)}
              bg="primary.500"
              rounded="lg"
              overflow="hidden"
              w={32}
              h={32}
              cursor="pointer"
            />
            <Col flex={1}>
              {auth && <FormUserUpdate titleLabel="" user={auth} />}
            </Col>
          </Row>
          <Heading>Outras Informações</Heading>
          <SimpleGrid columns={4} mt={4}>
            <AppButton onClick={modalPasswordDisclosure.onOpen}>
              Alterar Senha
            </AppButton>
          </SimpleGrid>
          <ModalUserChangePassword
            user={auth}
            isOpen={modalPasswordDisclosure.isOpen}
            onClose={modalPasswordDisclosure.onClose}
          />
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default profile
