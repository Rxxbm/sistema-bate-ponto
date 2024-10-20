import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Funcionario } from "../domain/funcionario";
import { FuncionarioRepository } from "../infra/funcionario.repository";

export class FindFuncionarioByIdUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly funcionarioRepository: FuncionarioRepository,
  ) {}

  async execute(data: Input): Promise<Output> {
    const funcionario = await this.funcionarioRepository.findById(data.id);

    if (!funcionario) {
      throw new Error("Funcionário não encontrado");
    }

    return funcionario;
  }
}

export type Input = {
  id: string;
};

export type Output = Funcionario;
