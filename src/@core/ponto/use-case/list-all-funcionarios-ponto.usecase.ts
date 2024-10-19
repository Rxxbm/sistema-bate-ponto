import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";
import { PontoRepository } from "../infra/ponto.repository";

export class ListFuncionarioPontosUseCase implements UseCase<Input, Output> {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(data: Input): Promise<Output> {
    const { funcionario_id, status } = data;

    if (status === "aberto") {
      const ponto = await this.pontoRepository.findOpenPontoByFuncionarioId(
        funcionario_id
      );
      return ponto;
    }

    if (status === "fechado") {
      const pontos =
        await this.pontoRepository.findAllClosedPontoByFuncionarioId(
          funcionario_id
        );
      return pontos;
    }

    const pontos = await this.pontoRepository.findAllPontoByFuncionarioId(
      funcionario_id
    );

    return pontos;
  }
}

export type Input = {
  funcionario_id: string;
  status?: string;
};

export type Output = Ponto[] | Ponto;
