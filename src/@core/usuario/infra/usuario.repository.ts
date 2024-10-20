import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Usuario } from "../domain/usuario";

export interface UsuarioRepository extends InMemoryRepository<Usuario> {
  findByEmail(email: string): Promise<Usuario | undefined>;
}

export class UsuarioInMemoryRepository extends InMemoryRepository<Usuario> implements UsuarioRepository {
  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.entities.find((item) => item.email === email);
  }
}
