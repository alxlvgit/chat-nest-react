import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IMessage, IRoom } from 'src/interfaces/interfaces';
import { v4 } from 'uuid';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  // Send all messages to the client when they connect
  async handleConnection(client: any, ...args: any[]) {
    console.log('Client connected ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected' + client.id);
  }

  // Listen for requests to join a room
  @SubscribeMessage('joinRoom')
  async handleJoiningTheRoom(client: any, room: IRoom) {
    const alreadyJoinedRoom = client.rooms.has(room.name);
    if (!alreadyJoinedRoom) {
      const [currentRoom] = client.rooms;
      // Leave the current room and join the new one
      if (currentRoom) {
        client.leave(currentRoom);
        console.log('Client ' + client.id + ' leaving room ' + currentRoom);
      }
      client.join(room.name);
      console.log('Client ' + client.id + ' joining room ' + room.name);
    }
    client.emit(
      'storedMessages',
      await this.chatService.getAllMessagesForRoom(room.id),
    );
  }

  // Listen for requests for all messages for specific room
  @SubscribeMessage('requestStoredMessages')
  async handleAllMessages(client: any, room: IRoom) {
    this.server
      .to(room.name)
      .emit(
        'storedMessages',
        await this.chatService.getAllMessagesForRoom(room.id),
      );
  }

  // Listen for messages from the client
  @SubscribeMessage('sendMessage')
  async handleMessage(client: any, messageObject: IMessage) {
    console.log('Received message from client: ', client.id, messageObject);
    await this.chatService.createMessage(messageObject);
    console.log('emmiting message to room' + messageObject.room.name);
    this.server
      .to(messageObject.room.name)
      .emit('message', { id: v4(), ...messageObject });
  }
}
