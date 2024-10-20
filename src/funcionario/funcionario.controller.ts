import { BadRequestException, Body, ConflictException, Controller, Get, Param, Post } from "@nestjs/common";
import { Funcionario } from "../@core/funcionario/domain/funcionario";
import { CreateFuncionarioUseCase } from "../@core/funcionario/use-case/create-funcionario.usecase";
import { ListFuncionariosUseCase } from "../@core/funcionario/use-case/list-funcionario.usecase";
import { FuncionarioCreateDTO } from "../@core/funcionario/domain/dto/funcionario.dto";
import { FindFuncionarioByIdUseCase } from "../@core/funcionario/use-case/find-funcionario-by-id";
import { FindFuncionariosByEmpresaIdUseCase } from "../@core/funcionario/use-case/list-funcionario-by-empresa_id";

@Controller('funcionario')
export class FuncionarioController {
  constructor(
    private readonly listFuncionariosUseCase: ListFuncionariosUseCase,
    private readonly createFuncionarioUseCase: CreateFuncionarioUseCase,
    private readonly findFuncionarioByIdUseCase: FindFuncionarioByIdUseCase,
    private readonly findFuncionariosByEmpresaIdUseCase: FindFuncionariosByEmpresaIdUseCase,
  ) {}

  @Get()
  async listAll(): Promise<Funcionario[]> {
    return this.listFuncionariosUseCase.execute();
  }

  @Post()
  async create(@Body() funcionarioData: any): Promise<Funcionario> {
    const funcionarioDTO = new FuncionarioCreateDTO(funcionarioData);
    const errors = await funcionarioDTO.validate(); 
    
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const funcionario = new Funcionario({
      usuario_id: funcionarioDTO.usuario_id, // Ajuste para usuário
      cargo: funcionarioDTO.cargo,           // Ajuste para cargo
      empresa_id: funcionarioDTO.empresa_id, // Supondo que o DTO contém empresa_id
    });

    try {
      await this.createFuncionarioUseCase.execute(funcionario.props);
      return funcionario; 
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Funcionario> {
    try{
      const funcionario = await this.findFuncionarioByIdUseCase.execute({ id });
      return funcionario;
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }

  @Get('empresa/:empresa_id')
  async findByEmpresaId(@Param('empresa_id') empresa_id: string): Promise<Funcionario[]> {
    try{
      const funcionarios = await this.findFuncionariosByEmpresaIdUseCase.execute({ empresa_id });
      return funcionarios;
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }
}
