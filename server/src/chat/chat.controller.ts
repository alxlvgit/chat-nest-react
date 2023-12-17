import { Controller, Get, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('rooms')
  async getRooms(@Req() request: Request, @Res() res) {
    const cookies = request.cookies;
    const jwtToken = cookies?.jwtToken?.access_token;
    if (!jwtToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decodedToken = this.jwtService.verify(jwtToken, {
        secret: process.env.JWT_SECRET,
      });
      const userEmail = decodedToken?.email;
      if (!userEmail) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const rooms = await this.chatService.getRoomsForUser(userEmail);
      return res.json({ rooms });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error. Could not retrieve the rooms',
      });
    }
  }
}
