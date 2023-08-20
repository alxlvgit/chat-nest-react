import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { MessagesGateway } from './chat/chat.gateway';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MessagesGateway, UserService, PrismaService],
})
export class AppModule {}
