import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModel } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioModel])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
