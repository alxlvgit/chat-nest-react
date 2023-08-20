import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [UserService, PrismaService],
  controllers: [UsersController],
})
export class UserModule {}
