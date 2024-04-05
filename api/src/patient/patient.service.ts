import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { FilterDto } from 'src/filter.dto';
import { MailService } from 'src/mail/mail.service';
import { startOfWeek, addDays, endOfWeek } from 'date-fns'; // Assuming you're using date-fns for date manipulation

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private mailService:MailService
  ){}

  async create(createPatientDto: CreatePatientDto):Promise<Patient> {
    const matricule = await this.generateUniqueMatricule();
    const patient = this.patientRepository.create({...createPatientDto,matricule: matricule});
    return await this.patientRepository.save(patient);
  }

  async generateUniqueMatricule(): Promise<string> {
    let matricule = Math.floor(Math.random() * 900000000000 + 100000000000).toString();
    if (matricule.length > 12) {
        matricule = matricule.substring(0, 12);
    } else if (matricule.length < 12) {
        const diff = 12 - matricule.length;
        const padding = "0".repeat(diff);
        matricule = padding + matricule;
    }    
    return matricule;
  }

  async findAll():Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async getPatientCountPerDay() {
    return this.patientRepository
      .createQueryBuilder('patient')
      .select("TO_CHAR(patient.createdat, 'YYYY-MM-DD') AS day")
      .addSelect('COUNT(*) as count')
      .where('patient.createdat >= CURRENT_DATE - INTERVAL \'7 days\'')
      .andWhere('patient.createdat IS NOT NULL') // Ajout de cette condition pour exclure les enregistrements avec des dates de création nulles
      .groupBy("TO_CHAR(patient.createdat, 'YYYY-MM-DD')")
      .orderBy("TO_CHAR(patient.createdat, 'YYYY-MM-DD')", 'ASC')
      .getRawMany()
  }
  async getRdvByPatient(mat: any) {
    return this.patientRepository.createQueryBuilder('patient')
    .where('patient.matricule = :mat',{mat})
    .getOne()
  }

  async sendEmail(id:any){
    const matricule = await this.generateUniqueMatricule();
    const patient = await this.patientRepository.findOneBy({id: id});

    if (patient) {
        const emailContent = `Dear ${patient.name},\n\nYour matricule for the recent payment is: ${matricule}.`;
        console.log(emailContent);
        
        await this.mailService.sendEmail(patient.email, emailContent);
    } else {
        throw new Error('Patient not found');
    }
  }

  async getPatientById(id: any) {
    return this.patientRepository.createQueryBuilder('patient')
    .where('patient.id = :id',{id})
    .getOne()
  }
  async getPatientByMat(matricule: any) {
return this.patientRepository.findOneBy({matricule})
  }
 async update(id: number, updatePatientDto: UpdatePatientDto):Promise<Patient> {
    const patient =  await this.patientRepository.preload({
      id:id,
      ...updatePatientDto
    })
    if(!patient){
      throw new BadRequestException('Something bad happened')
    }
    return await this.patientRepository.save(patient);  }

   async remove(id: number):Promise<Patient> {
    const patient = await this.patientRepository.preload({id})
    if(!patient){
      throw new BadRequestException('Something Bas happened')
    }
    patient.status = false
    return await this.patientRepository.save(patient)
  }
}
