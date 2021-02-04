import {
  Text,
  Heading,
  Box,
  SimpleGrid,
  Square,
  Collapse,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { PlusIcon } from '../Icons'
import Col from '../Utils/Col'
import Row from '../Utils/Row'

interface Item {
  label: string
  description?: string
  to: string
  icon?: React.ReactNode
}

interface BoxMenuCollapseProps {
  titleLabel: string
  description?: string
  items?: Item[]
}

const BoxMenuCollapse: React.FC<BoxMenuCollapseProps> = ({
  titleLabel,
  description,
  children,
  items = [],
}) => {
  const bgMenu = useColorModeValue('gray.100', 'gray.400')
  const bgMenuHover = useColorModeValue('gray.400', 'gray.800')
  const collapseDisclosure = useDisclosure()

  useEffect(() => {
    collapseDisclosure.onOpen()
  }, [])

  return (
    <Col>
      <Row
        alignItems="center"
        cursor="pointer"
        onClick={collapseDisclosure.onToggle}
        userSelect="none"
        overflow="hidden"
      >
        <Col p={2} flex={1}>
          <Heading
            fontSize="sm"
            textTransform="uppercase"
            fontWeight="bold"
            color="gray.400"
          >
            {titleLabel}
          </Heading>
          <Text fontSize="xs" mt={1} color="GrayText">
            {description}
          </Text>
        </Col>
        <Square
          size={14}
          transition="all .2s ease-in-out"
          color={collapseDisclosure.isOpen ? 'red.400' : 'white'}
          transform={
            collapseDisclosure.isOpen
              ? `rotate(${-(180 + 360 + 45)}deg)`
              : 'rotate(0)'
          }
        >
          <PlusIcon size={30} />
        </Square>
      </Row>
      <Collapse in={collapseDisclosure.isOpen}>
        <SimpleGrid gap={4} p={2} bg={bgMenu}>
          {items.map((item, keyItem) => (
            <Link key={`item${keyItem}`} href={item.to}>
              <Col
                cursor="pointer"
                userSelect="none"
                p={2}
                _hover={{ bg: bgMenuHover, boxShadow: '0 2px 5px rgba(0,0,0,.1)' }}
                rounded="sm"
              >
                <Text fontSize="sm" fontWeight="bold">
                  {item.label}
                </Text>
                {item.description && (
                  <Text fontSize="xs" fontWeight="lighter">
                    {item.description}
                  </Text>
                )}
              </Col>
            </Link>
          ))}
        </SimpleGrid>
      </Collapse>
      {children}
    </Col>
  )
}

export default BoxMenuCollapse
