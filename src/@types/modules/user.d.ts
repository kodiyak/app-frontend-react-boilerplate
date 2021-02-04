namespace App {
  interface User {
    id?: number
    name?: string
    username?: string
    email?: string
    remember_me_token?: string
    password?: string
    created_at?: Date
    updated_at?: Date
    file_avatar_id?: number
    avatar?: App.File
    roles?: App.Role[]
  }
}
