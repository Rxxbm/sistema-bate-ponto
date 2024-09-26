import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Ponto } from "../domain/ponto";

export interface PontoRepository extends InMemoryRepository<Ponto> {
  findOpenPontoByFuncionarioId(
    funcionario_id: string
  ): Promise<Ponto | undefined>;
}

export class PontoInMemoryRepository extends InMemoryRepository<Ponto> {
  async findOpenPontoByFuncionarioId(
    funcionario_id: string
  ): Promise<Ponto | undefined> {
    return this.entities.find(
      (ponto) => ponto.funcionario_id === funcionario_id && !ponto.checkout
    );
  }
}
