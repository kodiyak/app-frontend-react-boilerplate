import { ChangeEvent, useState } from 'react'

export function useForm<T = any>() {
  const [formData, setFormData] = useState<T>({} as any)

  const append = (fieldName: string, value: any) => {
    setFormData((oldFormData) => {
      return {
        ...oldFormData,
        [fieldName]: value,
      }
    })
  }
  const onChangeField = (fieldName: string) => {
    return (e: ChangeEvent<any>) => {
      e.preventDefault()
      append(fieldName, e.target.value)
    }
  }

  return {
    data: formData,
    onChangeField,
    append,
  }
}
