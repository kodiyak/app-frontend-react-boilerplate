import useSWR from 'swr'
import { HttpClient } from './HttpClient'
import * as uuid from 'uuid'
import { ModuleComponents } from './modules/ModuleComponents'
import { ModuleResource } from './modules/ModuleResource'
import { ModuleRelationship } from './modules/ModuleRelationship'

interface ModuleCreateOptions {
  uuid: boolean
}

export class Module<T, P> {
  public Components = new ModuleComponents<T, P>(this)

  constructor(public name: string) {}

  // @ts-ignore
  public get(query?: App.QueryString<T, P>) {
    return HttpClient.get<T[]>(`/v1/modules/${this.name}`, {
      params: query,
    })
  }

  public create(data: Partial<T>, options?: ModuleCreateOptions) {
    if (options?.uuid) {
      // @ts-ignore
      data.uuid = uuid.v4()
    }
    return HttpClient.post<T[]>(`/v1/modules/${this.name}`, data)
  }

  public update(model: Partial<T>) {
    // @ts-ignore
    const { id, ...rest } = model
    return HttpClient.put<T[]>(`/v1/modules/${this.name}/${id}`, rest)
  }

  public delete(model: T) {
    // @ts-ignore
    const { id } = model
    return HttpClient.delete<T[]>(`/v1/modules/${this.name}/${id}`)
  }

  // @ts-ignore
  public swr(query?: App.QueryString<T, P>) {
    return useSWR(`modules/${this.name}/${JSON.stringify(query)}`, () => {
      return this.get(query).then((res) => res.data)
    })
  }

  public related(item: T, relationship: P): ModuleRelationship<T, P> {
    return new ModuleRelationship(this, item, relationship)
  }

  public resource(item: T) {
    return new ModuleResource(this, item)
  }
}
