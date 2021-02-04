import { Box, useDisclosure, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage/index'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import AppButton from '../../../components/Utils/AppButton'
import App from '../../../app/App'
import ModalHeaderMinimalist from '../../../components/Modals/ModalHeaderMinimalist'
import FormFolderCreate from '../../../components/FormsDatas/FormFolderCreate'
import ListFoldersMini from '../../../components/Lists/ListFoldersMini'
import ModalSimpleForm from '../../../components/Modals/ModalSimpleForm'
import { useForm } from '../../../hooks/useForm'

const folders: React.FC = () => {
  const foldersData = App.Folder.swr({
    fields: ['*'],
  })
  const formDisclosure = useDisclosure()
  const formData = useForm()

  return (
    <AdminMasterPage>
      <AdminPageDefault
        titleLabel="Pastas"
        description="Pastas para armazenamento e organização de arquivos"
        rightContent={
          <Box>
            <AppButton onClick={formDisclosure.onToggle}>Nova Pasta</AppButton>
          </Box>
        }
      >
        <BoxContent pt={4}>
          <ModalSimpleForm
            modal={{
              isOpen: formDisclosure.isOpen,
              onClose: formDisclosure.onClose,
            }}
            form={{
              formData,
              titleLabel: 'Criar Pasta',
              description: 'Pasta para armazenamento de arquivos',
              fields: [
                {
                  label: 'Nome',
                  name: 'name',
                  fieldType: 'text',
                  isRequired: true,
                },
                {
                  label: 'Descrição',
                  name: 'description',
                  fieldType: 'textarea',
                  isRequired: false,
                },
              ],
              onSubmit: async () => {
                await App.Folder.create(formData.data, { uuid: true })
                formDisclosure.onClose()
              },
              button: { children: 'Criar Pasta' },
            }}
          />
          {foldersData.data && <ListFoldersMini folders={foldersData.data} />}
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default folders
