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
    if (!token?.access_token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Set the secure cookie with the token
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3600000), // 1 hour
      sameSite: 'none',
    });
    const { ...user } = req.user;
    res.json({ user: user });
  }

  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('jwtToken', {
      httpOnly: true,
      secure: true,
      expires: new Date(0), // Set the cookie to expire immediately
      sameSite: 'none',
    });
    console.log('Logged out');
    res.json({ message: 'Logged out' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
