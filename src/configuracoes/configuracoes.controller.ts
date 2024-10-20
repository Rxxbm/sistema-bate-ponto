import { BadRequestException, Body, ConflictException, Controller, Get, Post } from "@nestjs/common";
import { Configuracoes } from "../@core/configuracoes/domain/configuracao";
import { ListConfiguracoesUseCase } from '../@core/configuracoes/use-case/list-configuracoes.usecase'; 
import { CreateConfiguracaoUseCase } from '../@core/configuracoes/use-case/create-configuracao.usecase'; 
import { configuracoesCreateDTO } from "../@core/configuracoes/domain/dto/configuracoes.dto";

@Controller('configuracao') 
export class ConfiguracaoController {
  constructor(
    private readonly listConfiguracoesUseCase: ListConfiguracoesUseCase,
    private readonly createConfiguracaoUseCase: CreateConfiguracaoUseCase
  ) {}

  @Get()
  async listAll(): Promise<Configuracoes[]> {
    return await this.listConfiguracoesUseCase.execute();
  }

  @Post()
  async create(@Body() configuracaoData: any): Promise<Configuracoes> {
    const configuracoesDTO = new configuracoesCreateDTO(configuracaoData);

    const errors = await configuracoesDTO.validate();

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const configuracao = new Configuracoes(configuracaoData);

    try {
      await this.createConfiguracaoUseCase.execute(configuracao.props); 
      return configuracao; 
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }
}
