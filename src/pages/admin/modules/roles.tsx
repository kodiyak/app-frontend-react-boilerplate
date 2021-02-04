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
import { useRoles } from '../../../contexts/RoleContext'
import ModalSimpleSelector from '../../../components/Modals/ModalSimpleSelector'

const roles: React.FC = () => {
  const formDisclosure = useDisclosure()
  const permissionsDisclosure = useDisclosure()

  const formData = useForm<App.Role>()
  const [currentRole, setRole] = useState<App.Role>()
  const { permissions } = useRoles()

  return (
    <AdminMasterPage>
      <AdminPageDefault
        titleLabel="Roles - Cargos da Aplicação"
        rightContent={
          <Box>
            <AppButton
              onClick={() => {
                setRole(undefined)
                formDisclosure.onToggle()
              }}
            >
              Novo cargo
            </AppButton>
          </Box>
        }
      >
        <BoxContent pt={4}>
          <ModalSimpleSelector
            titleLabel={`Permissões de ${currentRole?.name}`}
            description={`Adicione ou remova permissões do cargo ${currentRole?.name}`}
            index="id"
            label="name"
            keyDescription="description"
            modal={{
              isOpen: permissionsDisclosure.isOpen,
              onClose: permissionsDisclosure.onClose,
            }}
            items={permissions}
            defaultValue={currentRole?.permissions?.map(
              (permission) => permission.id
            )}
            onSubmit={async (permissionsIds) => {
              await App.Role.resource(currentRole)
                .related('permissions')
                .sync(permissionsIds)
            }}
          ></ModalSimpleSelector>
          <ModalSimpleForm
            modal={{
              isOpen: formDisclosure.isOpen,
              onClose: formDisclosure.onClose,
            }}
            form={{
              formData,
              titleLabel: currentRole ? `Editar ${currentRole.name}` : 'Novo Cargo',
              defaultValue: currentRole || undefined,
              description: 'Grupos para permissões',
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
                if (currentRole) {
                  await App.Role.update({
                    id: currentRole.id,
                    ...formData.data,
                  }).then((res) => {
                    formDisclosure.onClose()
                  })
                } else {
                  await App.Role.create(formData.data).then((res) => {
                    formDisclosure.onClose()
                  })
                }
              },
              button: {
                children: currentRole
                  ? `Editar ${currentRole.name}`
                  : 'Cadastrar novo cargo',
              },
            }}
          ></ModalSimpleForm>
          <App.Role.Components.List
            query={{
              fields: ['*'],
              includes: {
                permissions: {
                  fields: ['*'],
                },
              },
            }}
          >
            {({ data: roles }: App.Components.List<App.Role>) => (
              <SimpleGrid gap={2}>
                {roles.map((role) => (
                  <Row
                    alignItems="center"
                    key={`role${role.id}`}
                    rounded="lg"
                    transition="all .3s ease-in-out"
                    p={4}
                    _hover={{ bg: 'gray.500' }}
                  >
                    <Col flex={1}>
                      <Heading mb={2} cursor="default">
                        {role.name}
                      </Heading>
                      <Text fontSize="sm" cursor="default">
                        {role.description}
                      </Text>
                    </Col>
                    <Badge>{role.key}</Badge>
                    <Row px={4}>
                      <AppButton
                        onClick={() => {
                          setRole(role)
                          permissionsDisclosure.onOpen()
                        }}
                      >
                        Permissões
                      </AppButton>
                      <AppButton
                        ml={2}
                        onClick={() => {
                          setRole(role)
                          formDisclosure.onOpen()
                        }}
                      >
                        Editar
                      </AppButton>
                    </Row>
                    <CloseButton
                      mx={4}
                      onClick={() => {
                        App.Role.delete(role)
                      }}
                    />
                  </Row>
                ))}
              </SimpleGrid>
            )}
          </App.Role.Components.List>
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default roles
