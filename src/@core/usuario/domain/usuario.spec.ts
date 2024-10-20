import { Usuario, UsuarioProps } from "./usuario";

describe("Usuario", () => {
  it("deve criar uma instância de Usuario com valores padrão", () => {
    const props: UsuarioProps = {
      nome: "João Silva",
      email: "joao.silva@example.com",
      senha: "senha-segura",
      tipo_usuario: "admin",
    };
    const usuario = new Usuario(props);

    expect(usuario.id).toBeDefined();
    expect(usuario.nome).toBe("João Silva");
    expect(usuario.email).toBe("joao.silva@example.com");
    expect(usuario.senha).toBe("senha-segura");
    expect(usuario.tipo_usuario).toBe("admin");
    expect(usuario.created_at).toBeInstanceOf(Date);
    expect(usuario.updated_at).toBeNull();
  });

  it("deve criar uma instância de Usuario com valores fornecidos", () => {
    const props: UsuarioProps = {
      nome: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      senha: "outra-senha-segura",
      tipo_usuario: "funcionario",
      created_at: new Date("2023-01-01"),
      updated_at: new Date("2023-01-02"),
    };
    const usuario = new Usuario(props);

    expect(usuario.nome).toBe("Maria Oliveira");
    expect(usuario.email).toBe("maria.oliveira@example.com");
    expect(usuario.senha).toBe("outra-senha-segura");
    expect(usuario.tipo_usuario).toBe("funcionario");
    expect(usuario.created_at).toEqual(new Date("2023-01-01"));
    expect(usuario.updated_at).toEqual(new Date("2023-01-02"));
  });

  it("deve atualizar o nome e o tipo de usuário do Usuario", () => {
    const props: UsuarioProps = {
      nome: "Ana Costa",
      email: "ana.costa@example.com",
      senha: "senha-muito-segura",
      tipo_usuario: "funcionario",
    };
    const usuario = new Usuario(props);

    usuario.update("Ana Pereira", "ana.pereira@example.com", "admin");

    expect(usuario.nome).toBe("Ana Pereira");
    expect(usuario.email).toBe("ana.pereira@example.com");
    expect(usuario.tipo_usuario).toBe("admin");
    expect(usuario.updated_at).toBeInstanceOf(Date);
  });

  it("deve atualizar a senha do Usuario", () => {
    const props: UsuarioProps = {
      nome: "Carlos Almeida",
      email: "carlos.almeida@example.com",
      senha: "senha123",
      tipo_usuario: "funcionario",
    };
    const usuario = new Usuario(props);

    usuario.updatePassword("nova-senha-segura");

    expect(usuario.senha).toBe("nova-senha-segura");
    expect(usuario.updated_at).toBeInstanceOf(Date);
  });
});
