import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IMessage, IRoom, IUser } from 'src/interfaces/interfaces';
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
  // Refactor this later
  @SubscribeMessage('joinRoom')
  async handleJoiningTheRoom(
    client: any,
    joinObject: { user: IUser; room: IRoom },
  ) {
    try {
      const { user, room } = joinObject;
      const storedRoom = await this.chatService.getRoom(room.id);
      const previouslyVisitedRooms = client.rooms.has(room.name);
      const isRoomMember = storedRoom.participants.some(
        (participant) => participant.email === user.email,
      );
      // If the user is not a member of the room, add them to the room
      if (!isRoomMember) {
        await this.chatService.addUserToRoom(user.email, room.id);
      }
      // If the user has visited other rooms, leave them
      if (!previouslyVisitedRooms) {
        const [currentRoom] = client.rooms;
        if (currentRoom) {
          client.leave(currentRoom);
        }
        client.join(room.name);
      }
      console.log('client', client.id, 'joined room: ' + room.name);
      const { messages, participants } = storedRoom;
      client.emit('roomData', { messages, participants });
    } catch (error) {
      console.log(error);
    }
  }

  // Listen for messages from the client
  @SubscribeMessage('messageFromClient')
  async handleMessage(client: any, messageObject: IMessage) {
    try {
      console.log('Received message from client: ', client.id);
      await this.chatService.createMessage(messageObject);
      this.server
        .to(messageObject.room.name)
        .emit('messageFromServer', { id: v4(), ...messageObject });
    } catch (error) {
      console.log(error);
    }
  }
}
