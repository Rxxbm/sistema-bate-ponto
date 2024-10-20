import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Funcionario } from "../domain/funcionario";

export interface FuncionarioRepository extends InMemoryRepository<Funcionario> {
  findByUsuarioId(usuario_id: string): Promise<Funcionario | undefined>;
  findByEmpresaId(empresa_id: string): Promise<Funcionario[]>;
}

export class FuncionarioInMemoryRepository extends InMemoryRepository<Funcionario> implements FuncionarioRepository {
  async findByUsuarioId(usuario_id: string): Promise<Funcionario | undefined> {
    return this.entities.find((item) => item.usuario_id === usuario_id);
  }

  async findByEmpresaId(empresa_id: string): Promise<Funcionario[]> {
    return this.entities.filter((item) => item.empresa_id === empresa_id);
  }
}
