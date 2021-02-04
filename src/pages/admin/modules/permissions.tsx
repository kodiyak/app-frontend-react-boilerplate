import {
  SimpleGrid,
  Box,
  Heading,
  useDisclosure,
  Text,
  Badge,
  CloseButton,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import App from '../../../app/App'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage'
import Col from '../../../components/Utils/Col'
import Row from '../../../components/Utils/Row'
import AppButton from '../../../components/Utils/AppButton'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import ModalSimpleForm from '../../../components/Modals/ModalSimpleForm'
import { useForm } from '../../../hooks/useForm'

const permissions: React.FC = () => {
  const formDisclosure = useDisclosure()
  const [currentPermission, setPermission] = useState<App.Permission>()
  const formData = useForm<App.Permission>()

  return (
    <AdminMasterPage>
      <AdminPageDefault
        titleLabel="Permissões"
        rightContent={
          <Box>
            <AppButton
              onClick={() => {
                setPermission(undefined)
                formDisclosure.onToggle()
              }}
            >
              Nova permissão
            </AppButton>
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
              titleLabel: currentPermission
                ? `Editar ${currentPermission.name}`
                : 'Nova Permissão',
              defaultValue: currentPermission || undefined,
              description: `As permissões são artifícios utilizados para o desenvolvedor conseguir parametrizar regras e condições da aplicação, pense bem em uma "key" unica, descritiva e evite muita semelhança entre elas para garantir um desenvolvimento mais fluido`,
              fields: [
                {
                  label: 'Nome',
                  name: 'name',
                  fieldType: 'text',
                  isRequired: true,
                },
                {
                  label: 'Key (DEV)',
                  name: 'key',
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
                if (currentPermission) {
                  await App.Permission.update({
                    id: currentPermission.id,
                    ...formData.data,
                  }).then(() => {
                    formDisclosure.onClose()
                  })
                } else {
                  await App.Permission.create(formData.data).then(() => {
                    formDisclosure.onClose()
                  })
                }
              },
              button: {
                children: currentPermission
                  ? `Editar ${currentPermission.name}`
                  : 'Cadastrar Nova Permissão',
              },
            }}
          ></ModalSimpleForm>
          <App.Permission.Components.List
            query={{
              fields: ['*'],
            }}
          >
            {({ data: permissions }: App.Components.List<App.Permission>) => (
              <SimpleGrid gap={2}>
                {permissions.map((permission) => (
                  <Row
                    alignItems="center"
                    key={`permission${permission.id}`}
                    rounded="lg"
                    transition="all .3s ease-in-out"
                    p={4}
                    _hover={{ bg: 'gray.500' }}
                  >
                    <Col flex={1}>
                      <Heading mb={2} cursor="default">
                        {permission.name}
                      </Heading>
                      <Text fontSize="sm" cursor="default">
                        {permission.description}
                      </Text>
                    </Col>
                    <Badge>{permission.key}</Badge>
                    <AppButton
                      ml={2}
                      onClick={() => {
                        setPermission(permission)
                        formDisclosure.onOpen()
                      }}
                    >
                      Editar
                    </AppButton>
                    <CloseButton
                      mx={4}
                      onClick={() => {
                        App.Permission.delete(permission)
                      }}
                    />
                  </Row>
                ))}
              </SimpleGrid>
            )}
          </App.Permission.Components.List>
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default permissions
