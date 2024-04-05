import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, BadRequestException } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import * as multer from 'multer';

@Controller('service')
@ApiTags("Service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  async create(
    @UploadedFile() file: multer.File,
    @Body() createServiceDto: CreateServiceDto
  ) {
    try {
      let fileBase64: string | null = null;
      if (file) {
        const fileData = file.buffer.toString('base64');
        createServiceDto.pic = `data:${file.mimetype};base64,${fileData}`;
      }
      return await this.serviceService.create(createServiceDto);
    } catch (error) {
      throw new BadRequestException('Unable to create message.');
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: multer.File,
    @Body() updateServiceDto: UpdateServiceDto
  ) {
    try {
      let fileBase64: string | null = null;
      if (file) {
        const fileData = file.buffer.toString('base64');
        updateServiceDto.pic = `data:${file.mimetype};base64,${fileData}`;
      }
      const existingService = await this.serviceService.findOne(+id);
      if (!file && existingService.pic) {
        updateServiceDto.pic = existingService.pic;
      }
      return await this.serviceService.update(+id, updateServiceDto);
    } catch (error) {
      throw new BadRequestException('Unable to update message.');
    }
  }
  

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.serviceService.update(+id, updateServiceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
