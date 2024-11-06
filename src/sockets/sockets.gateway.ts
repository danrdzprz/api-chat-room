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
    console.log(
      `user ${client.user._id} with socket ${client.user.name}`,
    );
    // client.join(getUserRoom(client.user.id));
    // console.log(client.use);
  }

  @SubscribeMessage('join-chat-room')
  async joinChatRoom(@ConnectedSocket() client: any, @MessageBody() chat_room: string) {
    console.log('join');
    client.join(getRoom(chat_room));
    console.log(client.rooms);

  }

  @SubscribeMessage('leave-chat-room')
  async leveChatRoom(@ConnectedSocket() client: any, @MessageBody() chat_room: string) {
    console.log('leave');
    client.leave(getRoom(chat_room));
  }


  handleDisconnect(@ConnectedSocket() client: any) {
    console.log(
      `user ${client.user.id} with socket ${client.id} with DISCONNECTED`,
    );
    client.leave(getUserRoom(client.user.id));
  }
}
