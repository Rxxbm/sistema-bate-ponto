import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Empresa } from "../domain/empresa";
import { EmpresaRepository } from "../infra/empresa.repository";

export class findEmpresaByIdUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly empresaRepository: EmpresaRepository,
  ) {}

  async execute(data: Input): Promise<Output> {

    const empresa = await this.empresaRepository.findById(data.id);

    if (!empresa) {
      throw new Error("Empresa não encontrada");
    }

    return empresa;
  }
}

export type Input = {
  id: string;
};

export type Output = Empresa;
