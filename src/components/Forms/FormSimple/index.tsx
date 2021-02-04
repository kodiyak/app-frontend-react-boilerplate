import React from 'react'
import {
  AvatarProps,
  ButtonProps,
  InputProps,
  TextareaProps,
  Box,
} from '@chakra-ui/react'
import FormContainer from '../FormContainer'
import Row from '../../Utils/Row'
import FormRow from '../FormRow'
import AppInput from '../../Utils/AppInput'
import { useForm } from '../../../hooks/useForm'
import AppTextarea from '../../Utils/AppTextarea'
import DropdownSelect, { DropdownSelectProps } from '../DropdownSelect'

interface DefaultFieldProps<T = any> {
  label?: string
  name?: any
  isRequired?: boolean
  props?: T
}
interface InputFieldProps extends DefaultFieldProps<InputProps> {
  fieldType: 'text'
}
interface TextareaFieldProps extends DefaultFieldProps<TextareaProps> {
  fieldType: 'textarea'
}
interface AvatarFieldProps extends DefaultFieldProps<AvatarProps> {
  fieldType: 'avatar'
}

interface SelectorFieldProps extends DefaultFieldProps<DropdownSelectProps> {
  fieldType: 'select'
}

type FieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | AvatarFieldProps
  | SelectorFieldProps

export interface FormSimpleProps {
  titleLabel?: string
  description?: string
  labelWidth?: number
  onSubmit?: () => any
  onClose?: () => any
  button?: ButtonProps
  fields: FieldProps[]
  formData: ReturnType<typeof useForm>
  defaultValue?: any
}

const FormSimple: React.FC<FormSimpleProps> = ({
  titleLabel,
  description,
  onSubmit,
  onClose,
  button,
  fields,
  formData,
  defaultValue,
  labelWidth,
}) => {
  return (
    <FormContainer {...{ titleLabel, description, onSubmit, onClose, button }}>
      <Box mt={4}>
        {fields.map((field) => (
          <Row key={`field${field.name}`}>
            <FormRow
              labelWidth={labelWidth}
              label={field.label}
              w="100%"
              isRequired={field.isRequired}
            >
              {field.fieldType === 'text' && (
                <AppInput
                  defaultValue={defaultValue?.[field.name]}
                  onChange={formData.onChangeField(field.name)}
                  {...field.props}
                />
              )}
              {field.fieldType === 'textarea' && (
                <AppTextarea
                  defaultValue={defaultValue?.[field.name]}
                  onChange={formData.onChangeField(field.name)}
                  {...field.props}
                />
              )}
              {field.fieldType === 'select' && (
                // <AppTextarea
                //   defaultValue={defaultValue?.[field.name]}
                //   onChange={formData.onChangeField(field.name)}
                //   {...field.props}
                // />
                <DropdownSelect
                  onChange={formData.onChangeField(field.name)}
                  {...field.props}
                />
              )}
              {/* {field.fieldType === 'textarea' && (
              <AppTextarea onChange={formData.onChangeField(field.label)} />
            )} */}
            </FormRow>
          </Row>
        ))}
      </Box>
    </FormContainer>
  )
}

export default FormSimple
