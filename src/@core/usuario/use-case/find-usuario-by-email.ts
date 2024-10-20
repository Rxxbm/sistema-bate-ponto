import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Usuario } from "../domain/usuario";
import { UsuarioRepository } from "../infra/usuario.repository";

export class FindUsuarioByEmailUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(data: Input): Promise<Output> {
    const usuario = await this.usuarioRepository.findByEmail(data.email);

    if (!usuario) {
      throw new Error("Usuário não encontrado com o email especificado");
    }

    return usuario;
  }
}

export type Input = {
  email: string;
};

export type Output = Usuario | null; // Pode retornar null se não encontrado
