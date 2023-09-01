import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IMessage, IRoom, IStoredRoom, IUser } from 'src/interfaces/interfaces';
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

  // Leave the room the user is currently in
  private leavePreviouslyEnteredRoom = (client: any) => {
    const [currentRoom] = client.rooms;
    if (currentRoom) {
      client.leave(currentRoom);
    }
  };

  // Enter new room
  private enterNewRoom = (
    client: any,
    roomName: string,
    roomData: IStoredRoom,
  ) => {
    client.join(roomName);
    client.emit('roomData', roomData);
  };

  // Add the user to the room, enter new room, and notify other members
  private addNewMemberToRoom = async (
    userEmail: string,
    roomId: number,
    client: any,
  ) => {
    await this.chatService.addUserToRoom(userEmail, roomId);
    const newRoomForClient = await this.chatService.getRoom(roomId, userEmail);
    this.leavePreviouslyEnteredRoom(client);
    client.emit('successfullyJoinedNewRoom', newRoomForClient);
    const { participants } = newRoomForClient;
    this.server.to(newRoomForClient.name).emit('newMemberInRoom', participants);
    this.enterNewRoom(client, newRoomForClient.name, newRoomForClient);
  };

  // Listen for requests to join a room
  @SubscribeMessage('requestJoinRoom')
  async handleJoinRequest(
    client: any,
    joinRequestData: { user: IUser; room: IRoom },
  ) {
    try {
      const { user, room } = joinRequestData;
      const storedRoom = await this.chatService.getRoom(room.id, user.email);
      const { isMember } = storedRoom;
      if (isMember) {
        console.log('client', client.id, 'is already a member of the room');
        return;
      }
      await this.addNewMemberToRoom(user.email, room.id, client);
      console.log('client', client.id, 'joined new room: ' + room.name);
    } catch (error) {
      console.log(error);
    }
  }

  // Listen for requests to enter a room
  @SubscribeMessage('enterRoom')
  async handleEnteringTheRoom(client: any, data: { user: IUser; room: IRoom }) {
    try {
      const { user, room } = data;
      const storedRoom = await this.chatService.getRoom(room.id, user.email);
      const { isMember } = storedRoom;
      if (!isMember) {
        throw new Error('User is not a member of the room');
      }
      this.leavePreviouslyEnteredRoom(client);
      this.enterNewRoom(client, room.name, storedRoom);
      console.log('client', client.id, 'entered room: ' + room.name);
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
