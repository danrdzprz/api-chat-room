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
import { getRoom, getUserRoom } from './rooms';
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
  }

  @SubscribeMessage('join-chat-room')
  async joinChatRoom(@ConnectedSocket() client: any, @MessageBody() chat_room: string) {
    client.join(getRoom(chat_room));

  }

  @SubscribeMessage('leave-chat-room')
  async leveChatRoom(@ConnectedSocket() client: any, @MessageBody() chat_room: string) {
    client.leave(getRoom(chat_room));
  }


  handleDisconnect(@ConnectedSocket() client: any) {
    client.leave(getUserRoom(client.user.id));
  }
}
