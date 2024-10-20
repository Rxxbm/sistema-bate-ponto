import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioInMemoryRepository, FuncionarioRepository } from '../@core/funcionario/infra/funcionario.repository';
import { ListFuncionariosUseCase } from '../@core/funcionario/use-case/list-funcionario.usecase';
import { CreateFuncionarioUseCase } from '../@core/funcionario/use-case/create-funcionario.usecase';
import { FindFuncionarioByIdUseCase } from '../@core/funcionario/use-case/find-funcionario-by-id';
import { FindFuncionariosByEmpresaIdUseCase } from '../@core/funcionario/use-case/list-funcionario-by-empresa_id';

@Module({
  controllers: [FuncionarioController],
  providers: [
    {
      provide: 'FuncionarioRepository',
      useClass: FuncionarioInMemoryRepository,
    },
    {
      provide: ListFuncionariosUseCase,
      useFactory: (funcionarioRepository: FuncionarioRepository) => new ListFuncionariosUseCase(funcionarioRepository),
      inject: ['FuncionarioRepository'],
    },
    {
      provide: CreateFuncionarioUseCase,
      useFactory: (funcionarioRepository: FuncionarioRepository) => new CreateFuncionarioUseCase(funcionarioRepository),
      inject: ['FuncionarioRepository'],
    },
    {
      provide: FindFuncionarioByIdUseCase,
      useFactory: (funcionarioRepository: FuncionarioRepository) => new FindFuncionarioByIdUseCase(funcionarioRepository),
      inject: ['FuncionarioRepository'],
    },
    {
      provide: FindFuncionariosByEmpresaIdUseCase,
      useFactory: (funcionarioRepository: FuncionarioRepository) => new FindFuncionariosByEmpresaIdUseCase(funcionarioRepository),
      inject: ['FuncionarioRepository'],
    },
  ],
  exports: [ListFuncionariosUseCase, FindFuncionarioByIdUseCase],
})
export class FuncionarioModule {}
