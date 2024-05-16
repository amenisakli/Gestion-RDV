import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>
  ) { }
  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceRepository.save(createServiceDto);
  }

  findAll() {
    return this.serviceRepository.createQueryBuilder('service')
    .select(['service.name','service.pic','service.desc','service.id','service.type'])
    .andWhere('service.status = true ')
    .getMany();  }

  async findOne(id: number): Promise<Service | null> {
    return await this.serviceRepository.findOneBy({ id });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({
      id,
      ...updateServiceDto
    })
    if (!service) {
      throw new BadRequestException('Something bad happened')
    }
    return await this.serviceRepository.save(service)
  }

  async remove(id: number) {
    const service = await this.serviceRepository.preload({
      id
    })
    if (!service) {
    throw new BadRequestException('Somthing bad happened')
    }
    service.status = false
    return await this.serviceRepository.save(service)
  }
}
