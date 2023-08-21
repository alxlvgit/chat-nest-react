import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessagesGateway } from './chat/chat.gateway';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, MessagesGateway, PrismaService],
})
export class AppModule {}
