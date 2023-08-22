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
  handleMessage(client: any, messageObject: any) {
    console.log('Received message from client:', messageObject, client.id);
    const { content, senderName } = messageObject;
    const formatMessage = {
      id: v4(),
      content: content,
      senderId: client.id,
      senderName: senderName,
    };
    this.server.emit('message', formatMessage);
  }
}
