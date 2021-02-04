namespace App {
  interface Folder {
    id?: number
    name?: string
    uuid?: string
    description?: any
    user_id?: any
    created_at?: Date
    updated_at?: Date
    user?: App.User
  }
}
