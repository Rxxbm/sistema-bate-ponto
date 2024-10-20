import { Funcionario } from "../domain/funcionario";
import { FuncionarioRepository } from "../infra/funcionario.repository";

export class ListFuncionariosUseCase {
  constructor(private funcionarioRepository: FuncionarioRepository) {}

  async execute(): Promise<Funcionario[]> {
    return this.funcionarioRepository.findAll();
  }
}

export type Output = Funcionario[];
