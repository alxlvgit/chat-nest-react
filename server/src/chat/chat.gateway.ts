import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { v4 } from 'uuid';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prisma: PrismaService) {}
  @WebSocketServer()
  server: Server;

  // Send all messages to the client when they connect
  async handleConnection(client: any, ...args: any[]) {
    console.log('Client connected ' + client.id);
    const messages = await this.prisma.getAllMessages();
    console.log(messages);
    client.emit('allMessages', messages);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected' + client.id);
  }

  // Listen for requests for all messages from the client
  @SubscribeMessage('requestStoredMessages')
  async handleAllMessages(client: any) {
    console.log('Client requested all messages ', client.id);
    this.server.emit('allMessages', await this.prisma.getAllMessages());
  }

  // Listen for messages from the client
  @SubscribeMessage('sendMessage')
  async handleMessage(client: any, messageObject: any) {
    console.log('Received message from client: ', client.id, messageObject);
    const { content, senderName, senderEmail, createdAt } = messageObject;
    const formatMessage = {
      id: v4(),
      content: content,
      senderName: senderName,
      senderEmail: senderEmail,
      createdAt: createdAt,
    };
    console.log('Formatted message: ', formatMessage);

    await this.prisma.message.create({
      data: {
        content: formatMessage.content,
        senderEmail: formatMessage.senderEmail,
        senderName: senderName,
        createdAt: createdAt,
      },
    });
    this.server.emit('message', formatMessage);
  }
}
