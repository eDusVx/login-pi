import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/criarUsuario.dto';
import { EfetuarLoginDto } from './dto/efetuarLogin.dto';
import { RedefinirSenhaDto } from './dto/redefnirSenha.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('registrar-usuario')
  async create(@Body() createLoginDto: CreateLoginDto) {
    try{
    return await this.loginService.criarUsuario(createLoginDto)
    } catch (e) {
      throw e
    }
  }

  @Post('efetuar-login')
  async efetuarLogin(@Body() efetuarLoginDto: EfetuarLoginDto) {
    try{
    return this.loginService.efetuarLogin(efetuarLoginDto);
    } catch (e) {
      throw e
    }
  }
  
  @Patch('redefinir-senha')
  findOne(@Body() body: RedefinirSenhaDto) {
    try {
    return this.loginService.redefinirSenhaUsuario(body);
  } catch (e) {
    throw e
  }
  }
}
