import { Box, Textarea } from '@chakra-ui/react'
import React from 'react'
import App from '../../app/App'
import { useForm } from '../../hooks/useForm'
import FormContainer, { FormContainerProps } from '../Forms/FormContainer'
import FormRow from '../Forms/FormRow'
import AppInput from '../Utils/AppInput'
import AppTextarea from '../Utils/AppTextarea'
import { useAuth } from '../../contexts/AuthContext'

const FormFolderCreate: React.FC<Partial<FormContainerProps>> = (props) => {
  const { auth } = useAuth()
  const onCreateUser = () => {
    return App.Folder.create(
      {
        ...formData.data,
        user_id: auth.id,
      },
      { uuid: true }
    ).then(() => {
      props.onClose?.()
    })
  }

  const formData = useForm<App.Folder>()
  return (
    <FormContainer
      titleLabel="Nova Pasta"
      button={{ children: 'Enviar' }}
      onSubmit={onCreateUser}
      {...props}
    >
      <FormRow label="Nome">
        <AppInput onChange={formData.onChangeField('name')} />
      </FormRow>
      <FormRow label="Descrição">
        <AppTextarea
          variant="filled"
          rounded="sm"
          onChange={formData.onChangeField('description')}
        />
      </FormRow>
    </FormContainer>
  )
}

export default FormFolderCreate
