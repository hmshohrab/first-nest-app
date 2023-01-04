import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/user/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    if (await this.userService.exist(user)) {
      throw new BadRequestException('User already exist, please login');
    }
    const { password_confirm, ...data } = user;

    if (user.password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    const hashed = await bcrypt.hash(user.password, 12);

    return this.userService.saveAll({
      ...data,
      password: hashed,
    });
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const email = body.email;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not exists, please register');
    }

    const hashed = await bcrypt.compare(body.password, user.password);
    if (hashed) {
      const jwt = await this.jwtService.signAsync({ ...user });
      return { message: 'Successfully logged in.', jwt };
    } else {
      throw new BadRequestException('Invalid Credentials.');
    }
  }

  @Get('all')
  all() {
    return this.userService.findAll();
  }

  @Get('clear')
  clear() {
    return this.userService.deleteAll();
  }
}
