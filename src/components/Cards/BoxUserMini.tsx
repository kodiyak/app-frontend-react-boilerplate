import {
  Avatar,
  Box,
  CloseButton,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Row from '../Utils/Row'
import Col from '../Utils/Col'
import App from '../../app/App'
import AppButton from '../Utils/AppButton'
import { useRoles } from '../../contexts/RoleContext'
import ModalSimpleSelector from '../Modals/ModalSimpleSelector'

interface BoxUserMiniProps {
  user: App.User
}

const BoxUserMini: React.FC<BoxUserMiniProps> = ({ user }) => {
  const rolesDisclosure = useDisclosure()
  const { roles } = useRoles()
  return (
    <>
      <ModalSimpleSelector
        titleLabel={`Permissões de ${user.name}`}
        description={`Adicione ou remova cargos do usuário`}
        index="id"
        label="name"
        modal={{
          isOpen: rolesDisclosure.isOpen,
          onClose: rolesDisclosure.onClose,
        }}
        items={roles}
        defaultValue={user.roles?.map((role) => role.id)}
        onSubmit={async (rolesIds) => {
          await App.User.resource(user).related('roles').sync(rolesIds)
        }}
      ></ModalSimpleSelector>
      <Col>
        <Row alignItems="center">
          <Avatar
            name={user.name || user.username}
            src={App.URL.createFileUrl(user.avatar)}
          />
          <Col px={4} flex={1}>
            <Text fontSize="sm" fontWeight="bold">
              {user.name}
            </Text>
            <Text fontSize="xs" color="GrayText">
              {user.username}
            </Text>
          </Col>
        </Row>
        {user.roles && (
          <Col pt={4}>
            <Heading mb={2} size="xs">
              Opções
            </Heading>
            <Row flexWrap="wrap">
              <AppButton onClick={rolesDisclosure.onOpen} size="xs">
                Ver Cargos ({user.roles?.length || 0})
              </AppButton>
            </Row>
          </Col>
        )}
      </Col>
    </>
  )
}

export default BoxUserMini
