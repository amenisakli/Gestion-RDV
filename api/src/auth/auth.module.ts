import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './jwt/constant';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),PassportModule,
  JwtModule.registerAsync
  ({
    imports: [ConfigModule],
    useFactory: async () => ({
      secret:jwtConstants.secret,
      signOptions: {
      },
    }),
    inject: [ConfigService],
  }),
 ],
  controllers: [AuthController],
  providers: [AuthService,UserService]
})
export class AuthModule {}
                                                                 