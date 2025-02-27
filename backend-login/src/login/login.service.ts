import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/criarUsuario.dto';
import { UsuarioModel } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { EfetuarLoginDto } from './dto/efetuarLogin.dto';
import { RedefinirSenhaDto } from './dto/redefnirSenha.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UsuarioModel)
    private readonly usuarioRepository: Repository<UsuarioModel>,
  ) {}

  async criarUsuario(createLoginDto: CreateLoginDto) {

    const buscarUsuario = await this.usuarioRepository.findOneBy({
      email: createLoginDto.email,
    });
    if (buscarUsuario)
      throw new HttpException(
        'Email já cadastrado na base',
        HttpStatus.BAD_REQUEST,
      );

    const senhaCriptografada = await hash(createLoginDto.senha, 10);

    const payloadUsario: CreateLoginDto = {
      username: createLoginDto.username,
      senha: senhaCriptografada,
      nome: createLoginDto.nome,
      email: createLoginDto.email,
    };
    const novoUsuario = this.usuarioRepository.create(payloadUsario);
    await this.usuarioRepository.save(novoUsuario);

    return {data: `Usuário ${createLoginDto.username} criado com sucesso`};
  }

  async efetuarLogin(efetuarLoginDto: EfetuarLoginDto) {
    try {
      const buscarUsuario = await this.usuarioRepository.findOneBy({
        email: efetuarLoginDto.email,
      });
      if (!buscarUsuario)
        throw new HttpException(
          'Usuario não encontrado',
          HttpStatus.BAD_REQUEST,
        );

      const compararSenha = await compare(
        efetuarLoginDto.senha,
        buscarUsuario?.senha,
      );
      if (!compararSenha) {
        throw new HttpException('Senha incorreta', HttpStatus.BAD_REQUEST);
      }

      return {data: 'Usuario logado com sucesso'};
    } catch (e) {
      throw e;
    }
  }

  async redefinirSenhaUsuario(redefinirSenhaDto: RedefinirSenhaDto) {
    const buscarUsuario = await this.usuarioRepository.findOneBy({
      email: redefinirSenhaDto.email,
    });
    if (!buscarUsuario)
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);

    const novaSenhaCriptografada = await hash(redefinirSenhaDto.senha, 10);

    const payloadUusario = {
      id: buscarUsuario.id,
      username: buscarUsuario.username,
      senha: novaSenhaCriptografada,
      nome: buscarUsuario.nome,
      email: buscarUsuario.email,
    };
    await this.usuarioRepository.save(payloadUusario);

    return {data: `A senha do usuário ${buscarUsuario.username} foi redefinida com sucesso`};
  }
}
