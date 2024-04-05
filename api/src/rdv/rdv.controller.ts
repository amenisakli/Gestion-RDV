import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RdvService } from './rdv.service';
import { CreateRdvDto } from './dto/create-rdv.dto';
import { UpdateRdvDto } from './dto/update-rdv.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('rdv')
@ApiTags('Rdv')
export class RdvController {
  constructor(private readonly rdvService: RdvService) {}

  @Post('create')
  create(@Body() createRdvDto: CreateRdvDto) :Promise<any>{
    return this.rdvService.create(createRdvDto);    
  }

  @Get()
  findAll() {
    return this.rdvService.findAll();
  }

  @Get('PerWeek')
  findPatientPerWeek() {
    return this.rdvService.getRdvsCountPerDay();
  }

  @Get('rdv/:id')
  findOne(@Param('id') id: string) {
    return this.rdvService.findOne(+id);
  }
  @Get('patient/:mat')
  findPat(@Param('mat') mat: string) {
    return this.rdvService.getRdvByPatient(mat);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRdvDto: UpdateRdvDto) {
    return this.rdvService.update(+id, updateRdvDto);
  }
  @Post('confirmer/:id')
  confirmer(@Param('id') id: string,@Body() email: string) {
   return this.rdvService.Confirmer(+id,email)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rdvService.remove(+id);
  }

  // @Post('confirm')
  // async confirmRendezvous(@Body() smsDto:SmsDto) {
  //   await this.smsService.sendConfirmationSMS(smsDto);
  //   return { success: true, message: 'Confirmation SMS sent successfully' };
  // }
  

}
