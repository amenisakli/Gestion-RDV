import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const multerOptions: MulterOptions = {
  dest: './uploads',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
@Module({
  imports:[
    TypeOrmModule.forFeature([Service]),
    MulterModule.register(multerOptions)
  ],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
