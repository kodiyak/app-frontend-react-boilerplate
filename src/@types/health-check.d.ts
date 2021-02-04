namespace App {
  declare module HealthCheck {
    export interface Health {
      healthy: boolean
    }

    export interface Env {
      displayName: string
      health: Health
    }

    export interface Health2 {
      healthy: boolean
    }

    export interface AppKey {
      displayName: string
      health: Health2
    }

    export interface Health3 {
      healthy: boolean
      message: string
    }

    export interface Meta {
      connection: string
      message: string
      error?: any
    }

    export interface Lucid {
      displayName: string
      health: Health3
      meta: Meta[]
    }

    export interface Report {
      env: Env
      appKey: AppKey
      lucid: Lucid
    }

    export interface RootObject {
      healthy: boolean
      report: Report
    }
  }
}
