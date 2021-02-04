namespace App {
  interface Role {
    id?: number
    name?: string
    description?: string
    key?: string
    color?: string
    permissions?: App.Permission[]
    created_at?: Date
    updated_at?: Date
  }
}
