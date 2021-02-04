export class UserResource {
  constructor(public user: App.User) {}

  public hasPermission(key: App.Permissions) {
    return this.user?.roles?.find((role) => {
      return role.permissions?.find((permission) => permission.key === key)
    })
  }

  public hasRole(key: App.Roles) {
    return this.user?.roles?.find((role) => {
      return role.key === key
    })
  }
}
