import { Controller, Get, Post, Body, BadRequestException} from '@nestjs/common';
import { Ponto } from '../@core/ponto/domain/ponto';
import { ListPontosUseCase } from '../@core/ponto/use-case/list-ponto.usecase';
import { createPontoUseCase } from '../@core/ponto/use-case/create-ponto.usecase';
import { PontoDTO } from '../@core/ponto/domain/dto/ponto.dto';


@Controller('ponto')
export class PontoController {
  constructor(private readonly listPontosUseCase: ListPontosUseCase) {}

  @Get()
  async listAll(): Promise<Ponto[]> {
    return this.listPontosUseCase.execute();
  }

  //@Post()
  //async create(@Body() pontoData: Partial<PontoDTO>): Promise<Ponto> {
    //const pontoDTO = new PontoDTO(pontoData); 
    //const errors = await pontoDTO.validate(); 

    //if (errors.length > 0) {
      //throw new BadRequestException(errors);
    //}

    //return this.createPontoUseCase.execute(pontoDTO); 
  //}
}
