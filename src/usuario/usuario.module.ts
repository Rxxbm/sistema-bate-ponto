import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioInMemoryRepository, UsuarioRepository } from '../@core/usuario/infra/usuario.repository';
import { ListUsuariosUseCase } from '../@core/usuario/use-case/list-usuarios.usecase';
import { CreateUsuarioUseCase } from '../@core/usuario/use-case/create-usuario.usecase';
import { FindUsuarioByIdUseCase } from '../@core/usuario/use-case/find-usuario-by-id';
import { FindUsuarioByEmailUseCase } from '../@core/usuario/use-case/find-usuario-by-email';

@Module({
  controllers: [UsuarioController],
  providers: [
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioInMemoryRepository,
    },
    {
      provide: ListUsuariosUseCase,
      useFactory: (usuarioRepository: UsuarioRepository) => new ListUsuariosUseCase(usuarioRepository),
      inject: ['UsuarioRepository'],
    },
    {
      provide: CreateUsuarioUseCase,
      useFactory: (usuarioRepository: UsuarioRepository) => new CreateUsuarioUseCase(usuarioRepository),
      inject: ['UsuarioRepository'],
    },
    {
      provide: FindUsuarioByIdUseCase,
      useFactory: (usuarioRepository: UsuarioRepository) => new FindUsuarioByIdUseCase(usuarioRepository),
      inject: ['UsuarioRepository'],
    },
    {
      provide: FindUsuarioByEmailUseCase,
      useFactory: (usuarioRepository: UsuarioRepository) => new FindUsuarioByEmailUseCase(usuarioRepository),
      inject: ['UsuarioRepository'],
    },
  ],
  exports: [ListUsuariosUseCase, FindUsuarioByIdUseCase],
})
export class UsuarioModule {}
