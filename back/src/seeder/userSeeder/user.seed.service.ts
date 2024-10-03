import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/entities/roles.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    //const Users = [
    //   {
    //     name: 'Admin User',
    //     dni: 10001,
    //     email: 'administrador@example.com',
    //     password: await bcrypt.hash('12345aS@', 10),
    //     address: '123 Admin St',
    //     city: 'Admin City',
    //     country: 'Admin Country',
    //     roles:[
    //       {
    //         id: 1,
    //         name: "admin",
    //         description: "Administrator with full access"
    //       }]
    //   },
    //   {
    //     name: 'Candidate User',
    //     dni: 1002,
    //     email: 'candidato@example.com',
    //     password: await bcrypt.hash('12345aS@', 10),
    //     address: '123 Admin St',
    //     city: 'Admin City',
    //     country: 'Admin Country',
    //     roles: [
    //         { id: 2, name: 'candidate', description: 'Candidate for elections' }
    //       ,]
    //   },
    //   {
    //     name: 'Votante User',
    //     dni: 10003,
    //     email: 'votante@example.com',
    //     password: await bcrypt.hash('12345aS@', 10),
    //     address: '123 Admin St',
    //     city: 'Admin City',
    //     country: 'Admin Country',
    //     roles: [{ id: 3, name: 'voter', description: 'Voter in the system' }],
    //   },
    //   {
    //     name: 'Moderador User',
    //     dni: 10004,
    //     email: 'moderador@example.com',
    //     password: await bcrypt.hash('12345aS@', 10),
    //     address: '123 Admin St',
    //     city: 'Admin City',
    //     country: 'Admin Country',
    //     roles: [{
    //       id: 4,
    //       name: 'moderator',
    //       description: 'Moderator with limited access',
    //     }],
    //   },
    // ];

    // for (const userData of Users) {
    //   const existingUser = await this.userRepository.findOne({
    //     where: { email: userData.email },
    //   });


    //   if (!existingUser) {
    //     const newUser = this.userRepository.create({
    //       ...userData,
    //     });
    //     await this.userRepository.save(newUser);
    //   } else {
    //     await this.userRepository.update({ id: existingUser.id }, { ...userData});
    //   }
    // }
  }
}
