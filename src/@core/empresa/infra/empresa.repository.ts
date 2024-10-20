import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Empresa } from "../domain/empresa";

export interface EmpresaRepository extends InMemoryRepository<Empresa> {
   findByCnpj(cnpj: string): Promise<Empresa | undefined>;
}

export class EmpresaInMemoryRepository extends InMemoryRepository<Empresa> {
  async findByCnpj(cnpj: string): Promise<Empresa | undefined> {
    return this.entities.find((item) => item.cnpj === cnpj);
  }
}
