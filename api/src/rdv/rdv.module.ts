import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rdv } from './entities/rdv.entity';
import { RdvController } from './rdv.controller';
import { RdvService } from './rdv.service';

@Module({
    imports:[TypeOrmModule.forFeature([Rdv]),
],
    controllers:[RdvController],
    providers:[RdvService],
})

export class RdvModule {}
