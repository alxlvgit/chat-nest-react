import { Controller, Get, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  async getRooms(@Req() request: Request) {
    const token = request.headers.authorization;
    console.log(token, 'token');
    const jwtToken = token.split(' ')[1];
    return await this.chatService.getRoomsForAuthorizedUser(jwtToken);
  }
}
