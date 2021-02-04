import React from 'react'
import App from '../../app/App'
import FormContainer, { FormContainerProps } from '../Forms/FormContainer'
import FormRow from '../Forms/FormRow'
import AppInput from '../Utils/AppInput'
import { useForm } from '../../hooks/useForm'

const FormUserCreate: React.FC<Partial<FormContainerProps>> = (props) => {
  const onCreateUser = () => {
    return App.User.create(formData.data).then(() => {
      props.onClose?.()
    })
  }

  const formData = useForm<App.User>()
  return (
    <FormContainer
      titleLabel="Cadastrar Usuário"
      button={{ children: 'Enviar' }}
      onSubmit={onCreateUser}
      {...props}
    >
      <FormRow label="Nome">
        <AppInput onChange={formData.onChangeField('name')} />
      </FormRow>
      <FormRow label="E-mail">
        <AppInput onChange={formData.onChangeField('email')} type="email" />
      </FormRow>
      <FormRow label="Senha">
        <AppInput onChange={formData.onChangeField('password')} type="password" />
      </FormRow>
      <FormRow label="Nome de Usuário">
        <AppInput onChange={formData.onChangeField('username')} />
      </FormRow>
    </FormContainer>
  )
}

export default FormUserCreate
