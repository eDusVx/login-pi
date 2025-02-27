import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsuarioModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column()
  email: string;
}
