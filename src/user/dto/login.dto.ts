import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/models/user';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
