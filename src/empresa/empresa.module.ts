import { Module } from '@nestjs/common';
import { EmpresaController} from './empresa.controller';
import { EmpresaInMemoryRepository, EmpresaRepository } from '../@core/empresa/infra/empresa.repository';
import { ListEmpresasUseCase } from '../@core/empresa/use-case/list-empresa.usecase';
import { createEmpresaUseCase } from '../@core/empresa/use-case/create-empresa.usecase';
import { findEmpresaByIdUseCase } from '../@core/empresa/use-case/find-empresa-by-id';


@Module({
  controllers: [EmpresaController],
  providers: [
    {
      provide: 'EmpresaRepository',
      useClass: EmpresaInMemoryRepository,
    },
    {
      provide: ListEmpresasUseCase,
      useFactory: (empresaRepository: EmpresaRepository) => new ListEmpresasUseCase(empresaRepository),
      inject: ['EmpresaRepository'],
    },
    {
      provide: createEmpresaUseCase,
      useFactory: (empresaRepository: EmpresaRepository) => new createEmpresaUseCase(empresaRepository),
      inject: ['EmpresaRepository'], 
    },
    {
      provide: findEmpresaByIdUseCase,
      useFactory: (empresaRepository: EmpresaRepository) => new findEmpresaByIdUseCase(empresaRepository),
      inject: ['EmpresaRepository'], 
    },
  ],
  exports: [ListEmpresasUseCase, findEmpresaByIdUseCase],
})
export class EmpresaModule {}
