import { Controller, Get, Post, Body, BadRequestException, Patch} from '@nestjs/common';
import { Ponto } from '../@core/ponto/domain/ponto';
import { ListPontosUseCase } from '../@core/ponto/use-case/list-ponto.usecase';
import { createPontoUseCase } from '../@core/ponto/use-case/create-ponto.usecase';
import { PontoDTO } from '../@core/ponto/domain/dto/ponto.dto';
import { closePontoUseCase } from 'src/@core/ponto/use-case/close-ponto.usecase';


@Controller('ponto')
export class PontoController {
  constructor(private readonly listPontosUseCase: ListPontosUseCase, private readonly createPontoUseCase: createPontoUseCase, private readonly closePontoUseCase: closePontoUseCase) {}

  @Get()
  async listAll(): Promise<Ponto[]> {
    return this.listPontosUseCase.execute();
  }

  @Post()
  async create(@Body() pontoData: Partial<PontoDTO>): Promise<Ponto> {
    const pontoDTO = new PontoDTO(pontoData); 
    const errors = await pontoDTO.validate(); 

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    try{
      return await this.createPontoUseCase.execute(pontoDTO);
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }

  @Patch()
  async close(@Body() pontoData: any): Promise<Ponto> {
    try{
      return await this.closePontoUseCase.execute(pontoData);
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }
}
