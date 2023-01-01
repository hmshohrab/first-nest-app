import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: "abc", signOptions: { expiresIn: "2d" } })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
