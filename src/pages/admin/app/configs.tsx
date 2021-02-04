import { Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage/index'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import Col from '../../../components/Utils/Col'
import Row from '../../../components/Utils/Row'
import FormSimple from '../../../components/Forms/FormSimple/index'
import { useForm } from '../../../hooks/useForm'
import FormAppConfig from '../../../components/Forms/FormAppConfig'
import App from '../../../app/App'

const AppConfigs: React.FC = () => {
  const formData = useForm()

  return (
    <AdminMasterPage>
      <AdminPageDefault titleLabel="Configurações do Sistema">
        <BoxContent pt={4}>
          <Col bg="gray.500" p={2} rounded="md">
            <Row>
              <Col flex={1}>
                <Heading size="md" pt={2}>
                  Configure seus arquivos e diretórios padrões para determinadas
                  ações
                </Heading>
              </Col>
            </Row>
            <App.AppConfig.Components.List
              query={{ fields: ['*'] }}
              swr={{ revalidateOnFocus: false }}
            >
              {({ data }: App.Components.List<App.AppConfig>) => (
                <Row w="100%">
                  <FormAppConfig
                    button={{
                      display: 'none',
                    }}
                    fields={data}
                    formData={formData}
                  />
                </Row>
              )}
            </App.AppConfig.Components.List>
          </Col>
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default AppConfigs
