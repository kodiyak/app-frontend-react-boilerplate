import React from 'react'
import { Module } from '../Module'
import useSWR, { ConfigInterface } from 'swr'
import { Collapse, Progress } from '@chakra-ui/react'

// @ts-ignore
interface ListProps<T, P> {
  // @ts-ignore
  query?: App.QueryString<T, P>
  swr?: ConfigInterface<T[]>
  showLoading?: boolean
}

export class ModuleComponents<T, P> {
  constructor(public module: Module<T, P>) {}

  public List: React.FC<ListProps<T, P>> = ({
    children,
    query = { fields: ['*'] },
    swr = { refreshInterval: 10000 },
    showLoading = false,
  }) => {
    const data = useSWR(
      `${this.module.name}/${JSON.stringify(query)}`,
      () => {
        return this.module.get(query).then((res) => res.data)
      },
      swr
    )

    // console.log('oba fion', data, newChildren)
    return (
      <>
        <Collapse in={data.isValidating && showLoading} animateOpacity>
          <Progress
            isIndeterminate
            colorScheme="primary"
            rounded="lg"
            mt={2}
            mb={4}
          />
        </Collapse>
        {/* @ts-ignore */}
        {children({
          data: data.data || [],
          revalidate: data.revalidate,
          isValidating: data.isValidating,
          error: data.error,
          mutate: data.mutate,
        })}
      </>
    )
  }
}
