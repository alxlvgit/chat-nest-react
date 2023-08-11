import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { v4 } from 'uuid';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected' + client.id);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, message: string) {
    console.log('Received message from client:', message, client.id);
    const formatMessage = {
      id: v4(),
      content: message,
      senderId: client.id,
    };
    this.server.emit('message', formatMessage);
  }
}
