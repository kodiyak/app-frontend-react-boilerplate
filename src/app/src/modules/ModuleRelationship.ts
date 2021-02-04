import { Module } from '../Module'
import { HttpClient } from '../HttpClient'
export class ModuleRelationship<T, P> {
  constructor(public module: Module<T, P>, public item: T, public relationship: P) {}

  public attach(data: number[]) {
    return this.runRelationship('attach', data)
  }

  public detach(data: number[]) {
    return this.runRelationship('detach', data)
  }

  public sync(data: number[]) {
    return this.runRelationship('sync', data)
  }

  private runRelationship(method: 'attach' | 'sync' | 'detach', data: any) {
    return HttpClient.post(
      // @ts-ignore
      `/v1/modules/${this.module.name}/${this.item.id}/relationships/${method}/${this.relationship}`,
      { data }
    )
  }
}
