import { Injectable } from '@nestjs/common';
import { IMessage } from 'src/interfaces/interfaces';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMessagesForRoom(roomId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        messages: true,
      },
    });
    return room.messages;
  }

  async createMessage(message: IMessage) {
    const { content, senderName, senderEmail, room, createdAt } = message;
    await this.prisma.message.create({
      data: {
        content,
        senderName,
        senderEmail,
        createdAt,
        roomId: room.id,
      },
    });
  }

  async getRooms() {
    return await this.prisma.room.findMany();
  }

  async getRoomMembers(roomId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        participants: true,
      },
    });
    return room.participants.map((participant) => {
      const { id, firstName, lastName, email } = participant;
      return { id, firstName, lastName, email };
    });
  }
}
