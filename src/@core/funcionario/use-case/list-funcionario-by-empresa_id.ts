import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Funcionario } from "../domain/funcionario";
import { FuncionarioRepository } from "../infra/funcionario.repository";

export class FindFuncionariosByEmpresaIdUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly funcionarioRepository: FuncionarioRepository,
  ) {}

  async execute(data: Input): Promise<Output> {
    const funcionarios = await this.funcionarioRepository.findByEmpresaId(data.empresa_id);

    if (!funcionarios || funcionarios.length === 0) {
      throw new Error("Nenhum funcionário encontrado para a empresa especificada");
    }

    return funcionarios;
  }
}

export type Input = {
  empresa_id: string;
};

export type Output = Funcionario[];
