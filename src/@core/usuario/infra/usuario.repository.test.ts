import { UsuarioInMemoryRepository } from "./usuario.repository";
import { Usuario, UsuarioProps } from "../domain/usuario";

describe("UsuarioInMemoryRepository", () => {
  let usuarioRepository: UsuarioInMemoryRepository;

  beforeEach(() => {
    usuarioRepository = new UsuarioInMemoryRepository();
  });

  it("deve adicionar um usuário ao repositório", async () => {
    const props: UsuarioProps = {
      nome: "Lucas Pereira",
      email: "lucas.pereira@example.com",
      senha: "senha-segura",
      tipo_usuario: "admin",
    };
    
    const usuario = new Usuario(props);
    await usuarioRepository.save(usuario);

    const foundUsuario = await usuarioRepository.findById(usuario.id);
    expect(foundUsuario).toEqual(usuario);
    });

  it("deve encontrar um usuário pelo email", async () => {
    const props: UsuarioProps = {
      nome: "Mariana Silva",
      email: "mariana.silva@example.com",
      senha: "outra-senha-segura",
      tipo_usuario: "funcionario",
    };

    const usuario = new Usuario(props);
    await usuarioRepository.save(usuario);

    const foundUsuario = await usuarioRepository.findByEmail("mariana.silva@example.com");
    expect(foundUsuario).toEqual(usuario);
  });

  it("deve retornar undefined se o usuário não for encontrado pelo email", async () => {
    const foundUsuario = await usuarioRepository.findByEmail("nao.existe@example.com");
    expect(foundUsuario).toBeUndefined();
  });
});
