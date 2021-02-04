import { HttpClient } from '../HttpClient'
export class HealthCheck {
  public data: App.HealthCheck.RootObject

  public async get() {
    return HttpClient.get<App.HealthCheck.RootObject>(`/health`).then((res) => {
      this.data = res.data
      return res
    })
  }
}
