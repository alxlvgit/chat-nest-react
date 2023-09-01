import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ChatController } from './chat.controller';
import { MessagesGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  providers: [PrismaService, ChatService, MessagesGateway, JwtService],
  controllers: [ChatController],
})
export class ChatModule {}
