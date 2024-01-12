import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  private verifyUser = async (request: Request, response: Response) => {
    const cookies = request.cookies;
    const jwtToken = cookies?.jwtToken?.access_token;
    if (!jwtToken) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decodedToken = this.jwtService.verify(jwtToken, {
        secret: process.env.JWT_SECRET,
      });
      const userEmail = decodedToken?.email;
      if (!userEmail) {
        return response.status(401).json({ message: 'Unauthorized' });
      }
      return userEmail;
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: 'Internal server error. Could not retrieve the rooms',
      });
    }
  };

  @Get('rooms')
  async getRooms(@Req() request: Request, @Res() response: Response) {
    const userEmail = await this.verifyUser(request, response);
    const rooms = await this.chatService.getRoomsForUser(userEmail);
    return response.json({ rooms });
  }

  @Post('room') // Create a new room
  async createRoom(@Req() request: Request, @Res() res) {
    const userEmail = await this.verifyUser(request, res);
    try {
      const { name } = request.body;
      const updatedRooms = await this.chatService.createRoom(name, userEmail);
      console.log('Room created');
      return res.json({ rooms: updatedRooms });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error. Could not create the room',
      });
    }
  }
}
