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

  // Listen for connections
  async handleConnection(client: any, ...args: any[]) {
    console.log('Client connected ' + client.id);
  }

  // Listen for disconnects
  handleDisconnect(client: any) {
    console.log('Client disconnected' + client.id);
  }

  // Listen for requests to join a room
  @SubscribeMessage('joinRoom')
  async handleJoiningTheRoom(client: any, room: IRoom) {
    const alreadyJoinedRoom = client.rooms.has(room.name);
    if (!alreadyJoinedRoom) {
      const [currentRoom] = client.rooms;
      if (currentRoom) {
        client.leave(currentRoom);
      }
      client.join(room.name);
    }
    console.log('client', client.id, 'joined room: ' + room.name);
    const roomMessages = await this.chatService.getAllMessagesForRoom(room.id);
    const roomMembers = await this.chatService.getRoomMembers(room.id);
    client.emit('roomData', { roomMessages, roomMembers });
  }

  // Listen for messages from the client
  @SubscribeMessage('messageFromClient')
  async handleMessage(client: any, messageObject: IMessage) {
    console.log('Received message from client: ', client.id);
    await this.chatService.createMessage(messageObject);
    this.server
      .to(messageObject.room.name)
      .emit('messageFromServer', { id: v4(), ...messageObject });
  }
}
