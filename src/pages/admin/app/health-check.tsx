import React from 'react'
import Col from '../../../components/Utils/Col'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage/index'
import Row from '../../../components/Utils/Row'
import { SimpleGrid, Box, Center, Text, Heading } from '@chakra-ui/react'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import { useHealth } from '../../../contexts/HealthCheckContext'
import AppInput from '../../../components/Utils/AppInput'
import { HttpClient } from '../../../app/src/HttpClient'

const healthCheck: React.FC = () => {
  const { healthCheck } = useHealth()
  return (
    <AdminMasterPage>
      <AdminPageDefault
        titleLabel="Health Check"
        description="Valida o estado atual da aplicação"
      >
        <BoxContent w="500px" my={20} bg="gray.600" rounded="lg" shadow="lg">
          <Row p={4} bg="gray.400" roundedTop="lg">
            <AppInput isReadOnly defaultValue={HttpClient.defaults.baseURL} />
          </Row>
          <SimpleGrid columns={2} gap={4} p={4}>
            <Center
              h={64}
              rounded="lg"
              bg="gray.700"
              fontSize="4xl"
              flexDir="column"
            >
              {healthCheck?.healthy ? '💖' : '🤢'}
              <Heading size="md">Aplicação</Heading>
            </Center>
            <Col h="100%">
              <SimpleGrid flex={1} columns={2} gap={4}>
                <Center flexDir="column" bg="gray.700" rounded="lg" fontSize="3xl">
                  {healthCheck?.report.appKey.health ? '💖' : '🤢'}
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    mt={4}
                    fontWeight="bold"
                    px={4}
                    textAlign="center"
                  >
                    {healthCheck?.report.appKey.displayName}
                  </Text>
                </Center>
                <Center flexDir="column" bg="gray.700" rounded="lg" fontSize="3xl">
                  {healthCheck?.report.env.health ? '💖' : '🤢'}
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    mt={4}
                    fontWeight="bold"
                    px={4}
                    textAlign="center"
                  >
                    {healthCheck?.report.env.displayName}
                  </Text>
                </Center>
              </SimpleGrid>
              <SimpleGrid flex={1} columns={1} gap={4} mt={4}>
                <Center flexDir="column" bg="gray.700" rounded="lg" fontSize="3xl">
                  {healthCheck?.report.lucid.health ? '💖' : '🤢'}
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    mt={4}
                    fontWeight="bold"
                    px={4}
                    textAlign="center"
                  >
                    {healthCheck?.report.lucid.displayName}
                  </Text>
                </Center>
              </SimpleGrid>
            </Col>
          </SimpleGrid>
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default healthCheck
