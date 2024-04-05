import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt/constant';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private jwtService:JwtService) {}

  @ApiBearerAuth()
  @Get('token')
  async getToken(@Req() request) {  
      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new Error('Invalid authorization header');
      }
      const token = authorizationHeader.split(' ')[1];    
      const verifiedToken = await this.jwtService.verify(token, jwtConstants);
      const userId = verifiedToken.id;   
      const user = await this.userService.getUserById(userId);   
      return user;
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req) {    
    return this.userService.findAll();
  }
  @Get('docteur')
  findDocteur() {    
    return this.userService.findDocteur();
  }
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Get('id/:id')
  findOneByID(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
