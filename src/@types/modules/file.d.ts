namespace App {
  interface File {
    id?: number
    name?: string
    uuid?: string
    description?: string
    mime_type?: string
    path?: string
    filename?: string
    original_filename?: string
    url_external?: string
    url_webview?: string
    folder_id?: number
    user_id?: number
    size?: number
    extension?: string
    folder?: App.Folder
    user?: App.User
    created_at?: Date
    updated_at?: Date
  }
}
