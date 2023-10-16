import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);
    // Set the secure cookie with the token
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3600000), // 1 hour
      sameSite: 'none',
    });
    const { password, ...user } = req.user;
    res.json({ user: user });
  }

  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('jwtToken');
    res.json({ message: 'Logged out' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
