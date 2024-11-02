import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { getUserRoom } from './rooms';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class SocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: any) {
  }
  @WebSocketServer()
  public server: Server;

  handleConnection(@ConnectedSocket() client: any) {
    console.log(
      `user ${client.user.id} with socket ${client.id}`,
    );
    client.join(getUserRoom(client.user.id));
  }

  handleDisconnect(@ConnectedSocket() client: any) {
    console.log(
      `user ${client.user.id} with socket ${client.id} with DISCONNECTED`,
    );
    client.leave(getUserRoom(client.user.id));
  }
}
