import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Empresa } from "../domain/empresa";
import { EmpresaRepository } from "../infra/empresa.repository";

export class createEmpresaUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly empresaRepository: EmpresaRepository,
  ) {}

  async execute(data: Input): Promise<Output> {

    

    if(await this.empresaRepository.findByCnpj(data.cnpj)){
      throw new Error("CNPJ já está em uso.");
    }

    const empresa = new Empresa(data);
    await this.empresaRepository.save(empresa);

    return empresa;
  }
}

export type Input = {
  name: string;
  cnpj: string;
};

export type Output = Empresa;
