import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }
    const user = this.userRepo.create(dto);

    const savedUser = await this.userRepo.save(user);

    return {
      message: 'User created',
      data: savedUser,
    };
  }

  findAll() {
    return this.userRepo.find();
  }

  findbyEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
