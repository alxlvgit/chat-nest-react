import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getAllMessages() {
    const messages = await this.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return messages;
  }
}
