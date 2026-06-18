import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userservice.create(dto);
  }

  @Get()
  findAll() {
    return this.userservice.findAll();
  }
}
