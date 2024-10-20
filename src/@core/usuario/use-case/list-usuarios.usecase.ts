import { Usuario } from "../domain/usuario";
import { UsuarioRepository } from "../infra/usuario.repository";

export class ListUsuariosUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }
}

export type Output = Usuario[];
