import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IMessage } from 'src/interfaces/interfaces';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createMessage(message: IMessage) {
    const { content, senderName, senderEmail, room, createdAt } = message;
    await this.prisma.message.create({
      data: {
        content,
        senderName,
        senderEmail,
        createdAt: new Date(createdAt),
        roomId: room.id,
      },
    });
  }

  async getRoomsForAuthorizedUser(token: string) {
    try {
      // Decode the JWT token to get user's email
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userEmail = decodedToken.email;
      const rooms = await this.getRooms(userEmail);
      console.log(rooms);
      return rooms;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException('Invalid token');
    }
  }

  private async getRooms(userEmail: string) {
    const rooms = await this.prisma.room.findMany({
      include: {
        participants: true,
        creator: true,
      },
    });
    const formattedRooms = rooms.map((room) => {
      const isCreator = room.creator.email === userEmail;
      const isMember = room.participants.some(
        (participant) => participant.email === userEmail,
      );

      return {
        ...room,
        isCreator,
        isMember,
      };
    });
    return formattedRooms;
  }

  async getRoom(roomId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        participants: true,
        messages: true,
      },
    });
    return room;
  }

  async addUserToRoom(userEmail: string, roomId: number) {
    await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        participants: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
  }
}
