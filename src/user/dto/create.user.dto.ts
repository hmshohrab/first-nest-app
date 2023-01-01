import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/models/user';

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    designation: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string;

    @IsNotEmpty()
    blood: string;

    get user(): User {
        const userItem = new User();
        userItem.name = this.name;
        userItem.designation = this.designation;
        userItem.email = this.email;
        userItem.blood = this.blood;
        console.log(userItem);
        userItem.name = "sldjflsdjf"
        
        return userItem;
    }
}