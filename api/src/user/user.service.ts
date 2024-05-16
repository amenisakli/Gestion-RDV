import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  private async hashpassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt)
}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }],
    });
    if (existingUser) {
        throw new ConflictException('Email déjà existant.');
    }
    createUserDto.password = await this.hashpassword(createUserDto.password, 10)
    const matricule = await this.generateUniqueMatricule();
    const user=this.userRepository.create({...createUserDto,matricule:matricule});
    return this.userRepository.save(user)
  }

  async generateUniqueMatricule(): Promise<string> {
    let matricule: string;
    let existingUser: User;
    do {
      matricule = Math.floor(Math.random() * 90000000 + 10000000).toString();
      const existingUser = await this.userRepository.findOne({
        where: { matricule: matricule },
      });
    } while (existingUser);

    return matricule;
  }
  findAll() {
    return this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.roleId','role')
    .leftJoinAndSelect('user.serviceId','service')
    .select(['user.name','user.id','user.lastname','user.email','user.tel','role.id','role.name','service.id','service.type'])
    .andWhere('user.status = true ')
    .getMany();
  }
  findDocteur() {
    return this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.roleId','role')
    .select(['user.name','user.id','user.lastname','user.email','user.tel','role.id','role.name'])
    .where('role.name = :name', { name: 'Docteur (e)' })
    .getMany();
  } 

  findOne(email: string) {
    return this.userRepository.findOne({where:{email}})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const rdv = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })
    if (!rdv) {
      throw new BadRequestException('Something bad happened')
    }
    return await this.userRepository.save(rdv);
  }

  async remove(id: number) {
    const user = await this.userRepository.preload({
      id
    })
    if (!user) {
    throw new BadRequestException('Somthing bad happened')
    }
    user.status = false
    return await this.userRepository.save(user)
  }
  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({   id })
    if (!found) {
      throw new NotFoundException(`Task is not found with Id "${id}"`)
    }
    return found
  }

}
