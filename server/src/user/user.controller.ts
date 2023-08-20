import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return result;
  }
}
