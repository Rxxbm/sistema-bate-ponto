import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Usuario } from "../domain/usuario";
import { UsuarioRepository } from "../infra/usuario.repository";

export class FindUsuarioByIdUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(data: Input): Promise<Output> {
    const usuario = await this.usuarioRepository.findById(data.id);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return usuario;
  }
}

export type Input = {
  id: string;
};

export type Output = Usuario;
