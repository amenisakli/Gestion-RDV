import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/singin.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user) {
            const isPasswordMatching = await bcrypt.compare(pass, user.password);
            if (isPasswordMatching) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(user: SignInDto) {
        const users = await this.validateUser(user.email, user.password) 
        if (!users) {
            throw new Error("Utilisateur non trouvé");
        }
        const payload = { id: users.id,username: users.name, lastname: users.lastname, roleId: users.roleId.name,email:users.email , tel:users.tel,matricule : users.matricule };                
        const token = this.jwtService.sign(payload)
        return {
            token,
            users
        };
    }
}
