import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { Ponto } from '../@core/ponto/domain/ponto';
import { ListPontosUseCase } from 'src/@core/ponto/use-case/list-ponto.usecase';


@Controller('ponto')
export class PontoController {
  constructor(private readonly listPontosUseCase: ListPontosUseCase) {}

  @Get()
  async listAll(): Promise<Ponto[]> {
    return this.listPontosUseCase.execute();
  }
}
