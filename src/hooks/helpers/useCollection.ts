import { useEffect, useState } from 'react'

export function useCollection<T>(defaultValue: T[] = []) {
  const [collection, setCollection] = useState<T[]>(defaultValue)

  useEffect(() => {
    setCollection(defaultValue)
  }, [defaultValue])

  const add = (newData: T) => {
    setCollection((oldCollection) => [...oldCollection, newData])
  }

  const remove = (removeData: T) => {
    setCollection((oldCollection) =>
      oldCollection.filter((data) => data !== removeData)
    )
  }

  const removeByIndex = (indexData: number) => {
    setCollection((oldCollection) =>
      oldCollection.filter((_, key) => key !== indexData)
    )
  }

  const exists = (existsData: T) => {
    return !!collection.find((data) => data === existsData)
  }

  const reset = () => {
    return setCollection([])
  }

  return {
    data: collection,
    add,
    remove,
    removeByIndex,
    exists,
    reset,
  }
}
