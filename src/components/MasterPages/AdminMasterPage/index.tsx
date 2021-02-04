import {
  Avatar,
  Box,
  Circle,
  Square,
  SquareProps,
  Text,
  useColorMode,
  useColorModePreference,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import constants from '../../../configs/constants'
import { HomeIcon, LogoutIcon, TeamIcon } from '../../Icons'
import Link from 'next/link'
import RedirectIf from '../../Utils/RedirectIf'
import { useAuth } from '../../../contexts/AuthContext'
import AppButton from '../../Utils/AppButton'
import BoxMenuCollapse from '../../Cards/BoxMenuCollapse'
import Col from '../../Utils/Col'
import App from '../../../app/App'
import Row from '../../Utils/Row'
import { useRouter } from 'next/router'

const SquareButton: React.FC<SquareProps> = (props) => {
  return (
    <Square
      size={20}
      borderLeft="2px solid transparent"
      cursor="pointer"
      userSelect="none"
      flexDir="column"
      color="white"
      {...props}
    />
  )
}

const AdminMasterPage: React.FC = ({ children }) => {
  const { auth, isAuth } = useAuth()
  const router = useRouter()
  const isLight = useColorModeValue(true, false)
  const bgMenu = useColorModeValue('gray.100', 'gray.700')
  const bgSidebar = useColorModeValue('gray.700', 'gray.900')
  const bgColorMode = useColorModeValue('black', 'white')
  const { toggleColorMode } = useColorMode()

  useEffect(() => {
    if (
      !auth ||
      !App.Auth.Resource.hasPermission('admin:login') ||
      !App.Auth.Resource.hasRole('admin')
    ) {
      App.Auth.logout()
    }
  }, [])

  return (
    <RedirectIf if={!isAuth} to="/login">
      <Box w="100%" h="100vh" d="flex">
        <Box w={20} h="100%" bg={bgSidebar} d="flex" flexDir="column">
          <Col my={4} color="white">
            <Avatar size="md" src={App.URL.createFileUrl(auth?.avatar)} mx="auto" />
            <Text fontSize="xs" fontWeight="bold" textAlign="center" mt={2}>
              {auth?.username}
            </Text>
          </Col>
          <Box w="100%" d="flex" flexDir="column">
            <Link href={`/admin`}>
              <SquareButton _hover={{ borderLeftColor: 'primary.500' }}>
                <HomeIcon size={24} />
              </SquareButton>
            </Link>
            <Link href={`/admin/modules/users`}>
              <SquareButton _hover={{ borderLeftColor: 'primary.500' }}>
                <TeamIcon size={24} />
              </SquareButton>
            </Link>
          </Box>
          <Box w="100%" d="flex" flexDir="column" mt="auto">
            <Row px={2} justifyContent="center">
              <Circle
                size={10}
                border="2px solid transparent"
                borderColor="white"
                bg={bgColorMode}
                cursor="pointer"
                onClick={toggleColorMode}
              />
            </Row>
            <Link href={`/login`}>
              <SquareButton
                _hover={{ borderLeftColor: 'red.500' }}
                onClick={() => {
                  App.Auth.logout()
                }}
              >
                <LogoutIcon />
              </SquareButton>
            </Link>
          </Box>
        </Box>
        <Box
          w={constants.theme.MENU_LEFT_WIDTH}
          h="100%"
          bg={bgMenu}
          overflowY="auto"
          borderRight={isLight ? '1px solid transparent' : 0}
          borderColor="gray.300"
        >
          <BoxMenuCollapse
            titleLabel="Menu de Aplicação"
            description="Configurações e estados do sistema"
            items={[
              {
                label: 'Health Check',
                to: '/admin/app/health-check',
              },
              {
                label: 'Configurações',
                description: 'Configure a aplicação',
                to: '/admin/app/configs',
              },
            ]}
          />
          <BoxMenuCollapse
            titleLabel="Menu Principal"
            description="Principais funcionalidades do sistema"
            items={[
              {
                label: 'Usuários',
                description: 'Usuários cadastrados no sistema',
                to: '/admin/modules/users',
              },
              {
                label: 'Cargos (Roles)',
                to: '/admin/modules/roles',
              },
              {
                label: 'Permissões',
                to: '/admin/modules/permissions',
              },
            ]}
          />
          <BoxMenuCollapse
            titleLabel="File System"
            description="Arquivos e diretórios físicos"
            items={[
              {
                label: 'Pastas',
                to: '/admin/modules/folders',
              },
              {
                label: 'Arquivos e Diretórios',
                description: 'Mapeamento físico',
                to: '/admin/fs',
              },
            ]}
          />
          <BoxMenuCollapse
            titleLabel={auth?.username}
            description="Perfil"
            items={[
              {
                label: 'Editar Informações de Perfil',
                to: '/admin/profile',
              },
            ]}
          />
        </Box>
        <Box flex={1} h="100%" overflowY="auto">
          {children}
        </Box>
      </Box>
    </RedirectIf>
  )
}

export default AdminMasterPage
