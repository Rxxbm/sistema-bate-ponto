import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Configuracoes } from "../domain/configuracao"; 

export interface ConfiguracoesRepository extends InMemoryRepository<Configuracoes> {
  findByEmpresaId(empresa_id: string): Promise<Configuracoes | undefined>;
}

export class ConfiguracoesInMemoryRepository extends InMemoryRepository<Configuracoes> implements ConfiguracoesRepository {
  async findByEmpresaId(empresa_id: string): Promise<Configuracoes | undefined> {
    return this.entities.find((item) => item.empresa_id === empresa_id);
  }
}
