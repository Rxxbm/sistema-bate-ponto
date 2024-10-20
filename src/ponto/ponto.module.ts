import { Module } from '@nestjs/common';
import { PontoController } from './ponto.controller';
import { ListPontosUseCase } from '../@core/ponto/use-case/list-ponto.usecase';
import { PontoInMemoryRepository, PontoRepository } from '../@core/ponto/infra/ponto.repository';
import { createPontoUseCase } from '../@core/ponto/use-case/create-ponto.usecase';

@Module({
  controllers: [PontoController],
  providers: [
    {
      provide: 'PontoRepository',
      useClass: PontoInMemoryRepository,
    },
    {
      provide: ListPontosUseCase,
      useFactory: (pontoRepository: PontoRepository) => new ListPontosUseCase(pontoRepository),
      inject: ['PontoRepository'],
    }
    //{
     // provide: createPontoUseCase,
     // useFactory: (pontoRepository: PontoRepository) => new createPontoUseCase(pontoRepository),
      //inject: ['PontoRepository'], 
   // },
  ],
  exports: [],
})
export class PontoModule {}
