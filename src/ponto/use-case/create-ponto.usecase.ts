import { RepositoryInterface } from "../../@thirdparty/domain/repositories/repository.interface";
import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";

export class createPontoUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly pontoRepository: RepositoryInterface<Ponto>,
    private readonly findEmpresaById: UseCase<any, any>,
    private readonly findFuncionarioById: UseCase<any, any>
  ) {}

  async execute(data: Input): Promise<Output> {
    const { empresa_id, funcionario_id } = data;
    await this.findEmpresaById.execute({ id: empresa_id });
    await this.findFuncionarioById.execute({ id: funcionario_id });

    const ponto = new Ponto(data);
    await this.pontoRepository.save(ponto);
    return ponto;
  }
}

export type Input = {
  empresa_id: string;
  funcionario_id: string;
};

export type Output = Ponto;
