import { BadRequestException, Body, ConflictException, Controller, Get, Post } from "@nestjs/common";
import { Empresa } from "../@core/empresa/domain/empresa";
import { createEmpresaUseCase } from "../@core/empresa/use-case/create-empresa.usecase";
import { ListEmpresasUseCase } from "../@core/empresa/use-case/list-empresa.usecase";
import { empresaCreateDTO } from "src/@core/empresa/domain/dto/empresa.dto";

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly listEmpresasUseCase: ListEmpresasUseCase, private readonly createEmpresaUseCase: createEmpresaUseCase) {}

  @Get()
  async listAll(): Promise<Empresa[]> {
    return this.listEmpresasUseCase.execute();
  }

  @Post()
  async create(@Body() empresaData: any): Promise<Empresa> {
    const empresaDTO = new empresaCreateDTO(empresaData);
    const errors = await empresaDTO.validate(); 
    
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const empresa = new Empresa({cnpj: empresaDTO.cnpj, name: empresaDTO.name});
    try{
      await this.createEmpresaUseCase.execute(empresa.props); 
      return empresa; 

    }catch(e){
      throw new ConflictException(e.message);
    }
  }
}
