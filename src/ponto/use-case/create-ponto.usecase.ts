import { QueueInterface } from "../../@thirdparty/infra/queue.interface";
import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";
import { PontoRepository } from "../infra/ponto.repository";

export class createPontoUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly pontoRepository: PontoRepository,
    private readonly findEmpresaById: UseCase<any, any>,
    private readonly findFuncionarioById: UseCase<any, any>,
    private readonly findConfiguracaoByEmpresaId: UseCase<any, any>,
    private readonly queue: QueueInterface
  ) {}

  async execute(data: Input): Promise<Output> {
    const { empresa_id, funcionario_id } = data;
    await this.findEmpresaById.execute({ id: empresa_id });
    const funcionario = await this.findFuncionarioById.execute({
      id: funcionario_id,
    });

    const alreadyExists =
      await this.pontoRepository.findOpenPontoByFuncionarioId(funcionario_id);

    if (alreadyExists) {
      throw new Error("Já existe um ponto aberto para esse funcionário");
    }

    const ponto = new Ponto(data);
    await this.pontoRepository.save(ponto);

    const configuracao = await this.findConfiguracaoByEmpresaId.execute({
      empresa_id,
    });

    await this.queue.add(
      "verificar-ponto",
      {
        funcionario_id: funcionario_id,
        email: funcionario.email,
      },
      {
        delay: 1000 * 60 * configuracao.intervalo_maximo,
      }
    );

    return ponto;
  }
}

export type Input = {
  empresa_id: string;
  funcionario_id: string;
};

export type Output = Ponto;
