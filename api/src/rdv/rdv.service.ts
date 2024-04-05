import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRdvDto } from './dto/create-rdv.dto';
import { UpdateRdvDto } from './dto/update-rdv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rdv } from './entities/rdv.entity';

@Injectable()
export class RdvService {
  constructor(
    @InjectRepository(Rdv)
    private rdvRepository: Repository<Rdv> ,    ) { }
  async create(createRdvDto: CreateRdvDto): Promise<Rdv> {

    return await this.rdvRepository.save(createRdvDto)
  }

  async findAll(): Promise<Rdv[]> {
    return await this.rdvRepository.find({ where: { status: true } })
  }

  async getRdvsCountPerDay() {
    return this.rdvRepository
      .createQueryBuilder('patient')
      .select("TO_CHAR(patient.createdat, 'YYYY-MM-DD') AS day")
      .addSelect('COUNT(*) as count')
      .where("patient.createdat >= CURRENT_DATE - INTERVAL '7 days'")
      .andWhere('patient.createdat IS NOT NULL')
      .groupBy("TO_CHAR(patient.createdat, 'YYYY-MM-DD')")
      .orderBy("TO_CHAR(patient.createdat, 'YYYY-MM-DD')", 'ASC')
      .getRawMany();
}


  async findOne(id: number): Promise<Rdv | null> {
    return await this.rdvRepository.findOneBy({ id });
  }

  async update(id: number, updateRdvDto: UpdateRdvDto) {
    const rdv = await this.rdvRepository.preload({
      id: id,
      ...updateRdvDto
    })
    if (!rdv) {
      throw new BadRequestException('Something bad happened')
    }
    return await this.rdvRepository.save(rdv);
  }
  async Confirmer(id: number,email:any) {
    const rdv = await this.rdvRepository.findOneBy({ id });
    if (!rdv) {
      throw new BadRequestException('Rendez-vous introuvable');
    }
    rdv.etat = true;
    await this.rdvRepository.save(rdv);

    return rdv;
  }



  async remove(id: number) {
    const rdv = await this.rdvRepository.findOne({
       where : {id: id}
    })
    if (!rdv) {
      throw new BadRequestException('Something bad happened')
    }
    rdv.status = false
    rdv.etat =false
    return await this.rdvRepository.save(rdv);
  }
  async getRdvByPatient(mat: any) {
    return this.rdvRepository.createQueryBuilder('rdv')
    .leftJoinAndSelect('rdv.patientId','patient')
    .leftJoinAndSelect('rdv.serviceId','service')
    .select(['rdv.date','service.name','rdv.id','rdv.etat'])
    .where('patient.matricule = :mat',{mat})
    .andWhere('rdv.status = true ')
    .getMany();
  }

}
