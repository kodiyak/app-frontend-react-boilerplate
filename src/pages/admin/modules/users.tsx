import { Box, Heading, useDisclosure, Center, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import App from '../../../app/App'
import FormUserCreate from '../../../components/FormsDatas/FormUserCreate'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage'
import AppButton from '../../../components/Utils/AppButton'
import ListUsersMini from '../../../components/Lists/ListUsersMini'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import ModalHeaderMinimalist from '../../../components/Modals/ModalHeaderMinimalist'
import BoxUserMini from '../../../components/Cards/BoxUserMini'
import ModalSimpleForm from '../../../components/Modals/ModalSimpleForm'
import { useForm } from '../../../hooks/useForm'

const users: React.FC = () => {
  const formDisclosure = useDisclosure()
  const formData = useForm()

  return (
    <AdminMasterPage>
      <AdminPageDefault
        titleLabel="Usuários"
        rightContent={
          <Box>
            <AppButton onClick={formDisclosure.onToggle}>
              Criar novo usuário
            </AppButton>
          </Box>
        }
      >
        <ModalSimpleForm
          modal={{
            isOpen: formDisclosure.isOpen,
            onClose: formDisclosure.onClose,
          }}
          form={{
            formData,
            titleLabel: 'Cadastrar Usuário',
            fields: [
              {
                label: 'Nome',
                name: 'name',
                fieldType: 'text',
                isRequired: true,
              },
              {
                label: 'E-mail',
                name: 'email',
                fieldType: 'text',
                isRequired: true,
              },
              {
                label: 'Nome de Usuário',
                name: 'username',
                fieldType: 'text',
                isRequired: true,
              },
            ],
            onSubmit: async () => {
              await App.User.create(formData.data).then((res) => {
                formDisclosure.onClose()
              })
            },
            button: {
              children: 'Novo Usuário',
            },
          }}
        />
        <BoxContent pt={4}>
          <App.User.Components.List
            query={{
              fields: ['*'],
              includes: {
                roles: { fields: ['*'] },
                avatar: { fields: ['*'] },
              },
            }}
          >
            {({ data: users }: App.Components.List<App.User>) => (
              <SimpleGrid columns={2} gap={4}>
                {users.map((user) => (
                  <Box key={`user${user.id}`}>
                    <BoxUserMini user={user} />
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </App.User.Components.List>
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default users
