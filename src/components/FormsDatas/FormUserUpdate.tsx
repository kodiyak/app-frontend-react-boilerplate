import React from 'react'
import { useForm } from '../../hooks/useForm'
import FormContainer, { FormContainerProps } from '../Forms/FormContainer'
import FormRow from '../Forms/FormRow'
import AppInput from '../Utils/AppInput'

import App from '../../app/App'
import { useAuth } from '../../contexts/AuthContext'

interface FormUserUpdateProps extends Partial<FormContainerProps> {
  user: App.User
}

const FormUserUpdate: React.FC<FormUserUpdateProps> = ({ user, ...props }) => {
  const { auth } = useAuth()
  const onUpdateUser = async () => {
    await App.User.update({ ...user, ...formData.data }).then(() => {
      if (auth.id === user.id) {
        App.Auth.events.emit('forceRefresh')
      }
    })
  }

  const formData = useForm<App.User>()
  return (
    <FormContainer
      titleLabel=""
      button={{ children: 'Confirmar Edição' }}
      onSubmit={onUpdateUser}
      {...props}
    >
      <FormRow label="Nome">
        <AppInput
          onChange={formData.onChangeField('name')}
          defaultValue={user.name}
        />
      </FormRow>
      <FormRow label="E-mail">
        <AppInput
          onChange={formData.onChangeField('email')}
          defaultValue={user.email}
          type="email"
        />
      </FormRow>
      <FormRow label="Nome de Usuário">
        <AppInput
          onChange={formData.onChangeField('username')}
          defaultValue={user.username}
        />
      </FormRow>
    </FormContainer>
  )
}

export default FormUserUpdate
