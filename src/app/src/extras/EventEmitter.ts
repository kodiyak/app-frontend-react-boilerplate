import EventEmitter3 from 'eventemitter3'

export default class EventEmitter<T> {
  public emitter: EventEmitter3
  constructor() {
    this.emitter = new EventEmitter3()
  }

  public on<K extends keyof T>(eventName: K, handler: (data: T[K]) => any) {
    return this.emitter.on(eventName as string, handler)
  }

  public emit<K extends keyof T>(eventName: K, data?: T[K]) {
    return this.emitter.emit(eventName as string, data)
  }

  public off<K extends keyof T>(eventName: K) {
    return this.emitter.off(eventName as string)
  }
}
