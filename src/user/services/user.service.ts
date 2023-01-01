import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models/user";
import { Repository } from "typeorm"; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findBy(option: any): Promise<User[]> {
    return this.userRepository.findBy(option);
  }
  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  saveAll(userList: any): Promise<User[]> {
    return this.userRepository.save(userList);
  }

  deleteAll() {
    this.userRepository.clear();
    return { message: "Sucessfully cleared" }
  }

  exist(user: any) {
    return this.userRepository.exist({ where: { email: user.email } })
  }

  getHello(): any {

    return [
      {
        "name": "Md. Asif Parvez Sarker",
        "designation": "Lead Engineer",
        "email": "asif.baust@gmail.com",
        "blood": "O+"
      },
      {
        "name": "Md Shohrab Hossen",
        "designation": "Software Engineer",
        "email": "Hmshohrab20@gmail.com",
        "blood": "O+"
      },
      {
        "name": "Rakibul Hassan",
        "designation": "Software Engineer",
        "email": "rakibcse99@gmail.com",
        "blood": "A+"
      }
    ];
  }
}
