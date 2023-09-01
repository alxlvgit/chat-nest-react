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

  // Create a new message
  async createMessage(message: IMessage) {
    const { content, senderName, senderEmail, room, createdAt } = message;
    const data = {
      content,
      senderName,
      senderEmail,
      createdAt: new Date(createdAt),
      roomId: room.id,
    };
    await this.prisma.message.create({
      data,
    });
  }

  // Get all rooms and verify the user
  async getRoomsForUser(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userEmail = decodedToken.email;
      const rooms = await this.getRooms(userEmail);
      return rooms;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Get all rooms
  private async getRooms(userEmail: string) {
    const include = {
      participants: {
        select: {
          email: true,
        },
      },
      creator: {
        select: {
          email: true,
        },
      },
    };
    const rooms = await this.prisma.room.findMany({
      include: include,
    });
    const formattedRooms = rooms.map((room) => {
      return this.formatRoom(room, userEmail);
    });
    return formattedRooms;
  }

  // Format the room data
  private formatRoom = (room, userEmail) => {
    const isMember = room.participants.some(
      (participant) => participant.email === userEmail,
    );
    return {
      id: room.id,
      name: room.name,
      isMember,
    };
  };

  // Get a single room
  async getRoom(roomId: number, userEmail: string) {
    const include = {
      participants: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      messages: true,
    };
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: include,
    });
    const isMember = room.participants.some(
      (participant) => participant.email === userEmail,
    );
    return {
      ...room,
      isMember,
    };
  }

  // Add a user to a room
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
