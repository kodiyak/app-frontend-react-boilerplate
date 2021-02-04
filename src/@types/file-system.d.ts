namespace App {
  namespace FileSystem {
    interface FileSystemMetadata {
      dev: any
      mode: number
      nlink: number
      uid: number
      gid: number
      rdev: number
      blksize: number
      ino: any
      size: number
      blocks: number
      atimeMs: number
      mtimeMs: number
      ctimeMs: number
      birthtimeMs: number
      atime: Date
      mtime: Date
      ctime: Date
      birthtime: Date
    }

    interface Main {
      name: string
      isDirectory: boolean
      metadata: App.FileSystem.FileSystemMetadata
    }

    interface MainDetails {
      details: App.FileSystem.FileSystemMetadata
      dir: string
      path: string
    }
  }
}
