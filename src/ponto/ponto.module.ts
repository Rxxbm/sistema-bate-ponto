import { Module } from '@nestjs/common';
import { PontoController } from './ponto.controller';
import { ListPontosUseCase } from '../@core/ponto/use-case/list-ponto.usecase';
import { PontoInMemoryRepository, PontoRepository } from '../@core/ponto/infra/ponto.repository';

@Module({
  controllers: [PontoController],
  providers: [
    {
      provide: 'PontoRepository',
      useClass: PontoInMemoryRepository,
    },
    {
      provide: ListPontosUseCase, // Adicione isso
      useFactory: (pontoRepository: PontoRepository) => new ListPontosUseCase(pontoRepository),
      inject: ['PontoRepository'], // Injete a dependência aqui
    },
  ],
  exports: [ListPontosUseCase],
})
export class PontoModule {}
