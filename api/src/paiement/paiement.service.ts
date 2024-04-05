import { Injectable } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paiement } from './entities/paiement.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(Paiement)
    private paiementRepository: Repository<Paiement>,
  ) { }
  async create(createPaiementDto: CreatePaiementDto) {
    const matricule = await this.generateUniqueMatricule();
    const paiement = await this.paiementRepository.create({ ...createPaiementDto, matricule: matricule });
    const savedPaiement = await this.paiementRepository.save(paiement);

    return savedPaiement
}

  async generateUniqueMatricule(): Promise<string> {
    let matricule = Math.floor(Math.random() * 900000  + 100000).toString();
    if (matricule.length > 6) {
      matricule = matricule.substring(0, 6);
    } else if (matricule.length < 6) {
      const diff = 6 - matricule.length;
      const padding = "0".repeat(diff);
      matricule = padding + matricule;
    }
    return matricule;
  }
  
  findAll() {
    return `This action returns all paiement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paiement`;
  }

  update(id: number, updatePaiementDto: UpdatePaiementDto) {
    return `This action updates a #${id} paiement`;
  }

  remove(id: number) {
    return `This action removes a #${id} paiement`;
  }
}
