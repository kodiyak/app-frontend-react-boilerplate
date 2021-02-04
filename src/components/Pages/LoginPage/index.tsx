import React, { useState } from 'react'
import { Box, Center, FormLabel, Image } from '@chakra-ui/react'
import constants from '../../../configs/constants'
import AppInput from '../../Utils/AppInput'
import AppButton from '../../Utils/AppButton'
import App from '../../../app/App'
import { useForm } from '../../../hooks/useForm'
import { AuthCredentials } from '../../../app/src/Auth'

const LoginPage: React.FC = () => {
  const formData = useForm<AuthCredentials>()
  const [isLoading, setLoading] = useState(false)

  const onSubmitHandle = async () => {
    setLoading(true)
    await App.Auth.authByCredentials(formData.data).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Center w="100%" h="100vh">
      <Box w={350} bg="gray.900" rounded="md" shadow="lg">
        <Box p={4}>
          <Image src={constants.theme.LOGO} />
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmitHandle()
          }}
        >
          <Box p={4} d="flex" flexDir="column">
            <FormLabel>E-mail</FormLabel>
            <AppInput onChange={formData.onChangeField('email')} type="email" />
          </Box>
          <Box p={4} d="flex" flexDir="column">
            <FormLabel>Senha</FormLabel>
            <AppInput
              onChange={formData.onChangeField('password')}
              type="password"
            />
          </Box>
          <Box p={4} d="flex" flexDir="column">
            <AppButton type="submit" isLoading={isLoading}>
              Entrar
            </AppButton>
          </Box>
        </form>
      </Box>
    </Center>
  )
}

export default LoginPage
