import io from 'socket.io-client'

export class WebSocket {
  public io: SocketIOClient.Socket
  constructor(public url: string) {
    this.io = io.connect(this.url)
  }
}
