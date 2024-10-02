import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Ponto } from "../domain/ponto";

export interface PontoRepository extends InMemoryRepository<Ponto> {
  findOpenPontoByFuncionarioId(
    funcionario_id: string
  ): Promise<Ponto | undefined>;
  findByEmpresaId(empresa_id: string): Promise<Ponto[]>;
  findAllOpenPontoByEmpresaId(empresa_id: string): Promise<Ponto[]>;
  findAllClosedPontoByEmpresaId(empresa_id: string): Promise<Ponto[]>;
}

export class PontoInMemoryRepository extends InMemoryRepository<Ponto> {
  async findOpenPontoByFuncionarioId(
    funcionario_id: string
  ): Promise<Ponto | undefined> {
    return this.entities.find(
      (ponto) => ponto.funcionario_id === funcionario_id && !ponto.checkout
    );
  }

  async findByEmpresaId(empresa_id: string): Promise<Ponto[]> {
    return this.entities.filter((ponto) => ponto.empresa_id === empresa_id);
  }

  async findAllOpenPontoByEmpresaId(empresa_id: string): Promise<Ponto[]> {
    return this.entities.filter(
      (ponto) => !ponto.checkout && ponto.empresa_id === empresa_id
    );
  }

  async findAllClosedPontoByEmpresaId(empresa_id: string): Promise<Ponto[]> {
    return this.entities.filter(
      (ponto) => ponto.checkout && ponto.empresa_id === empresa_id
    );
  }
}
