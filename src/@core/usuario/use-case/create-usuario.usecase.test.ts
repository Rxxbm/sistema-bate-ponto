import { CreateUsuarioUseCase, Input, Output } from "./create-usuario.usecase";
import { Usuario } from "../domain/usuario";
import { UsuarioInMemoryRepository } from "../infra/usuario.repository";

describe("CreateUsuarioUseCase", () => {
  let usuarioRepository: UsuarioInMemoryRepository;
  let useCase: CreateUsuarioUseCase;

  beforeEach(() => {
    usuarioRepository = new UsuarioInMemoryRepository();
    useCase = new CreateUsuarioUseCase(usuarioRepository);
  });

  it("deve criar um Usuario e salvar com sucesso", async () => {
    const input: Input = {
      nome: "Lucas Pereira",
      email: "lucas.pereira@example.com",
      senha: "senha-segura",
      tipo_usuario: "admin",
    };

    const spy = jest.spyOn(usuarioRepository, "save");
    const usuario = new Usuario(input);

    const result = await useCase.execute(input);

    expect(spy).toHaveBeenCalledWith(usuario);
    expect(result).toEqual(usuario);
  });

  it("deve retornar um erro caso o email já esteja em uso", async () => {
    const input: Input = {
      nome: "Mariana Silva",
      email: "mariana.silva@example.com",
      senha: "outra-senha-segura",
      tipo_usuario: "funcionario",
    };

    // Cria um usuário com o mesmo email para simular duplicação
    await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toThrow("Já existe um usuário com esse email.");
  });
});
