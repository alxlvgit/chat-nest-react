import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @Get()
  async seedDb() {
    return this.userService.createUser({
      email: 'test@mail.com',
      name: 'test',
    });
  }
}
