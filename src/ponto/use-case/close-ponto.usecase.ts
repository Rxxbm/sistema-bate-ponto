import { QueueInterface } from "../../@thirdparty/infra/queue.interface";
import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";
import { PontoRepository } from "../infra/ponto.repository";

export class closePontoUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly pontoRepository: PontoRepository,
    private readonly queue: QueueInterface
  ) {}

  async execute(data: Input): Promise<Output> {
    const { funcionario_id } = data;
    const ponto = await this.pontoRepository.findOpenPontoByFuncionarioId(
      funcionario_id
    );

    if (!ponto) {
      throw new Error("Não existe um ponto aberto para esse funcionário");
    }

    ponto.fechar_ponto();

    await this.pontoRepository.update(ponto);

    await this.queue.removeJob(ponto.id);

    return ponto;
  }
}

export type Input = {
  funcionario_id: string;
};

export type Output = Ponto;
