import { Module } from '../Module'
import { HttpClient } from '../HttpClient'
import { ModuleRelationship } from './ModuleRelationship'
export class ModuleResource<T, P> {
  constructor(public module: Module<T, P>, public item: T) {}

  public related(relationship: P) {
    return new ModuleRelationship(this.module, this.item, relationship)
  }
}
