import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Patient")
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get('PerWeek')
  findPatientPerWeek() {
    return this.patientService.getPatientCountPerDay();
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.getRdvByPatient(+id);
  }
  @Get('send/:id')
  sendemail(@Param('id') id: string) {
    return this.patientService.sendEmail(+id);
  }
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.patientService.getPatientById(+id);
  }
  @Get('mat/:id')
  findOneByMat(@Param('id') id: string) {
    return this.patientService.getPatientByMat(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
