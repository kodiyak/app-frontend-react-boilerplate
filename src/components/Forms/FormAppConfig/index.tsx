import React, { useEffect, useState } from 'react'
import { ButtonProps, Progress } from '@chakra-ui/react'
import { useForm } from '../../../hooks/useForm'
import FormContainer from '../FormContainer'
import Col from '../../Utils/Col'
import Row from '../../Utils/Row'
import FormRow from '../FormRow'
import AppInput from '../../Utils/AppInput'
import DropdownSelect from '../DropdownSelect'
import App from '../../../app/App'
import AppTextarea from '../../Utils/AppTextarea'

export interface FormAppConfigProps {
  titleLabel?: string
  description?: string
  labelWidth?: number
  onSubmit?: () => any
  onClose?: () => any
  button?: ButtonProps
  fields: App.AppConfig[]
  formData: ReturnType<typeof useForm>
}

const FormAppConfig: React.FC<FormAppConfigProps> = ({
  titleLabel,
  description,
  onSubmit,
  onClose,
  button,
  fields,
  formData,
  labelWidth,
}) => {
  const [modulesOptions, setModuleOptions] = useState({})
  const onSaveConfigHandle = (appConfig: App.AppConfig, value?: any) => {
    App.AppConfig.update({
      id: appConfig.id,
      value: value || formData.data[appConfig.key],
    })
  }

  useEffect(() => {
    fields.map((appConfig) => {
      if (appConfig.type?.startsWith('modules:')) {
        const [, moduleInfos] = appConfig.type.split(':') // modules:Folder[name|id] -> Folder[name|id]
        const [moduleName] = moduleInfos.split('[')
        const [, moduleFields] = moduleInfos.match(new RegExp(/\[(.*)\]/))
        const [label, index] = moduleFields.split('|')
        App[moduleName].get({ fields: [label, index] }).then((res) => {
          setModuleOptions((oldModuleOptions) => {
            return {
              ...oldModuleOptions,
              [appConfig.id]: {
                data: res.data,
                moduleName,
                label,
                index,
              },
            }
          })
        })
      }
      return appConfig
    })
  }, [fields])

  return (
    <FormContainer
      isClosable={false}
      {...{ titleLabel, description, onSubmit, onClose, button }}
    >
      <Col>
        {fields.map((appConfig) => (
          <Row key={`field${appConfig.key}`}>
            <FormRow labelWidth={labelWidth} label={appConfig.title} w="100%">
              {appConfig.type === 'text' && (
                <AppInput
                  defaultValue={appConfig.value}
                  onChange={formData.onChangeField(appConfig.key)}
                  onBlur={() => {
                    onSaveConfigHandle(appConfig)
                  }}
                />
              )}
              {appConfig.type === 'textarea' && (
                <AppTextarea
                  defaultValue={appConfig.value}
                  onChange={formData.onChangeField(appConfig.key)}
                  onBlur={() => {
                    onSaveConfigHandle(appConfig)
                  }}
                />
              )}
              {appConfig.type.startsWith('modules:') && (
                <>
                  {modulesOptions[appConfig.id] ? (
                    <DropdownSelect
                      index={modulesOptions[appConfig.id].index}
                      items={modulesOptions[appConfig.id].data}
                      label={modulesOptions[appConfig.id].label}
                      defaultValue={appConfig.value}
                      onChange={(value) => {
                        if (value) {
                          formData.append(
                            appConfig.key,
                            value[modulesOptions[appConfig.id].index]
                          )
                          onSaveConfigHandle(
                            appConfig,
                            value[modulesOptions[appConfig.id].index]
                          )
                        }
                      }}
                    />
                  ) : (
                    <Progress isIndeterminate w="100%" />
                  )}
                </>
              )}
            </FormRow>
          </Row>
        ))}
      </Col>
    </FormContainer>
  )
}

export default FormAppConfig
