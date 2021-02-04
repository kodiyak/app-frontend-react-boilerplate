import React, { useEffect, useState } from 'react'
import Col from '../Utils/Col'
import Row from '../Utils/Row'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuItemProps,
  useDisclosure,
  CloseButton,
} from '@chakra-ui/react'
import { DownIcon } from '../Icons'

const DropdownItem: React.FC<MenuItemProps> = (props) => {
  return (
    <MenuItem
      fontSize="xs"
      textTransform="uppercase"
      fontWeight="bold"
      fontFamily="sans-serif"
      p={3}
      {...props}
    />
  )
}

export interface DropdownSelectProps {
  labelText?: string
  defaultValue?: any
  index: any
  label: string
  items: any[]
  onChange?: (value: any) => any
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  labelText = 'Selecione um item...',
  items = [],
  index,
  onChange,
  defaultValue,
}) => {
  const [currentItem, setItem] = useState()
  const dropdownDisclosure = useDisclosure()

  useEffect(() => {
    onChange?.(currentItem)
  }, [currentItem])

  useEffect(() => {
    if (items.length > 0) {
      const defaultItem = items.find(
        (item) => String(item[index]) === String(defaultValue)
      )
      if (defaultItem) {
        setItem(defaultItem)
      }
    }
  }, [])

  return (
    <>
      <Menu isOpen={dropdownDisclosure.isOpen} placement="bottom-start" matchWidth>
        <MenuButton w="100%" role="group" onClick={dropdownDisclosure.onToggle}>
          <Row
            rounded="sm"
            bg="gray.700"
            w="100%"
            p={2}
            alignItems="center"
            _groupHover={{ bg: 'gray.600' }}
          >
            <Text
              flex={1}
              textAlign="left"
              fontSize="xs"
              textTransform="uppercase"
              pl={4}
            >
              {/* @ts-ignore */}
              {currentItem ? currentItem?.[label] : labelText}
            </Text>
            <Box
              px={2}
              transition="all .2s ease-in-out"
              transform={`rotate(${
                dropdownDisclosure.isOpen ? '540deg' : '-45deg'
              })`}
            >
              <CloseButton />
            </Box>
          </Row>
        </MenuButton>
        <MenuList
          w="100%"
          rounded="sm"
          bg="gray.600"
          border={0}
          boxShadow="0 5px 20px rgba(0,0,0,.3)"
        >
          {items.map((item) => (
            <DropdownItem
              onClick={() => {
                setItem(item)
              }}
              key={`item${item[index]}`}
            >
              {item[label]}
            </DropdownItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default DropdownSelect
