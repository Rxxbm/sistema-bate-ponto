import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";
import { PontoRepository } from "../infra/ponto.repository";

export class ListEmpresaPontosUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly pontoRepository: PontoRepository,
    private readonly findUsuarioById: UseCase<any, any>,
    private readonly findFuncionarioByUsuarioId: UseCase<any, any>
  ) {}

  async execute(data: Input): Promise<Output> {
    const { usuario_id, empresa_id, status } = data;

    const usuario = await this.findUsuarioById.execute(usuario_id);

    if (usuario.role === "RH") {
      const funcionario = await this.findFuncionarioByUsuarioId.execute(
        usuario_id
      );

      if (!funcionario || funcionario.empresa_id !== empresa_id)
        throw new Error("Funcionário não encontrado ou não pertence a empresa");
    }

    if (status === "aberto") {
      const pontos = await this.pontoRepository.findAllOpenPontoByEmpresaId(
        empresa_id
      );
      return pontos;
    }

    if (status === "fechado") {
      const pontos = await this.pontoRepository.findAllClosedPontoByEmpresaId(
        empresa_id
      );
      return pontos;
    }

    const pontos = await this.pontoRepository.findByEmpresaId(empresa_id);

    return pontos;
  }
}

export type Input = {
  usuario_id: string;
  empresa_id: string;
  status?: string;
};

export type Output = Ponto[];
