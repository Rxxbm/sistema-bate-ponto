import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Funcionario } from "../domain/funcionario";
import { FuncionarioRepository } from "../infra/funcionario.repository";

export class CreateFuncionarioUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly funcionarioRepository: FuncionarioRepository,
  ) {}

  async execute(data: Input): Promise<Output> {
    // Verifica se o funcionário já existe com o mesmo usuario_id na empresa
    if (await this.funcionarioRepository.findByUsuarioId(data.usuario_id)) {
      throw new Error("Já existe um funcionário com esse usuário.");
    }

    // Cria uma nova instância de Funcionario e salva no repositório
    const funcionario = new Funcionario(data);
    await this.funcionarioRepository.save(funcionario);

    return funcionario;
  }
}

export type Input = {
  usuario_id: string;
  cargo: string;
  empresa_id: string;
};

export type Output = Funcionario;
