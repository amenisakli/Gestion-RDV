import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RdvModule } from './rdv/rdv.module';
import { ServiceModule } from './service/service.module';
import { PatientModule } from './patient/patient.module';
import { PaiementModule } from './paiement/paiement.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'gestion_rdv',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,

  }),
  RdvModule,
  ServiceModule,
  PatientModule,
  PaiementModule,
  UserModule,
  AuthModule,
  RoleModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
