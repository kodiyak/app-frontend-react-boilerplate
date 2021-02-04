namespace App {
  interface AppConfig {
    id?: number
    title?: string
    key?: 'app:folders:avatar' | 'app:fileSystem:rootDir'
    value?: any
    type?: string
    description?: string
    created_at?: Date
    updated_at?: Date
  }
}
