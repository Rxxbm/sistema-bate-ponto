import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Usuario } from "../domain/usuario";
import { UsuarioRepository } from "../infra/usuario.repository";

export class CreateUsuarioUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(data: Input): Promise<Output> {
    // Verifica se o usuário já existe com o mesmo email
    if (await this.usuarioRepository.findByEmail(data.email)) {
      throw new Error("Já existe um usuário com esse email.");
    }

    // Cria uma nova instância de Usuario e salva no repositório
    const usuario = new Usuario(data);
    await this.usuarioRepository.save(usuario);

    return usuario;
  }
}

export type Input = {
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: string;
};

export type Output = Usuario;
