import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor( 
    @InjectRepository(Role)
    private roleRepository:Repository<Role>
  ){}


  async create(createRoleDto: CreateRoleDto): Promise<Role> {
const role = this.roleRepository.create({...createRoleDto})
    return await this.roleRepository.save(role)
  }

  findAll() {
    return this.roleRepository.find({ where: { status: true } });
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({id});
  }

  async update(id: number, updateRoleDto:UpdateRoleDto) {
    const rdv = await this.roleRepository.preload({
      id: id,
      ...updateRoleDto
    })
    if (!rdv) {
      throw new BadRequestException('Something bad happened')
    }
    return await this.roleRepository.save(rdv);
  }

  async remove(id: number) {
    const user = await this.roleRepository.preload({
      id
    })
    if (!user) {
    throw new BadRequestException('Somthing bad happened')
    }
    user.status = false
    return await this.roleRepository.save(user)
  }
}
