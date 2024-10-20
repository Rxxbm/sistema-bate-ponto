import { Module } from '@nestjs/common';
import { PontoController } from './ponto.controller';
import { ListPontosUseCase } from '../@core/ponto/use-case/list-ponto.usecase';
import { PontoInMemoryRepository, PontoRepository } from '../@core/ponto/infra/ponto.repository';
import { createPontoUseCase } from '../@core/ponto/use-case/create-ponto.usecase';
import { findEmpresaByIdUseCase } from '../@core/empresa/use-case/find-empresa-by-id';
import { FindFuncionarioByIdUseCase } from '../@core/funcionario/use-case/find-funcionario-by-id';
import { FindConfiguracaoByEmpresaIdUseCase } from '../@core/configuracoes/use-case/find-configuracao-by-empresa-id';
import { EmpresaModule } from '../empresa/empresa.module';
import { FuncionarioModule } from '../funcionario/funcionario.module';
import { ConfiguracaoModule } from '../configuracoes/configuracoes.module';
import { closePontoUseCase } from '../@core/ponto/use-case/close-ponto.usecase';

@Module({
  controllers: [PontoController],
  imports: [EmpresaModule, FuncionarioModule, ConfiguracaoModule],
  providers: [
    {
      provide: 'PontoRepository',
      useClass: PontoInMemoryRepository,
    },
    {
      provide: ListPontosUseCase,
      useFactory: (pontoRepository: PontoRepository) => new ListPontosUseCase(pontoRepository),
      inject: ['PontoRepository'],
    },
     {
      provide: createPontoUseCase, // Correção do nome do provider
      useFactory: (
        pontoRepository: PontoRepository,
        findEmpresaById: findEmpresaByIdUseCase,
        findFuncionarioByIdUseCase: FindFuncionarioByIdUseCase,
        findConfiguracaoByEmpresaIdUseCase: FindConfiguracaoByEmpresaIdUseCase
      ) => new createPontoUseCase(pontoRepository, findEmpresaById, findFuncionarioByIdUseCase, findConfiguracaoByEmpresaIdUseCase, null),
      inject: ['PontoRepository', findEmpresaByIdUseCase, FindFuncionarioByIdUseCase, FindConfiguracaoByEmpresaIdUseCase],
    },
    {
      provide: closePontoUseCase,
      useFactory: (pontoRepository: PontoRepository) => new closePontoUseCase(pontoRepository, null),
      inject: ['PontoRepository'],
    },
  ],
  exports: [],
})
export class PontoModule {}
