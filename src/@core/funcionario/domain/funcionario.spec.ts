import { Funcionario, FuncionarioProps } from "./funcionario";

describe("Funcionario", () => {
  it("deve criar uma instância de Funcionario com valores padrão", () => {
    const props: FuncionarioProps = {
      usuario_id: "user-123",
      cargo: "Desenvolvedor",
      empresa_id: "empresa-123",
    };
    const funcionario = new Funcionario(props);

    expect(funcionario.id).toBeDefined();
    expect(funcionario.usuario_id).toBe("user-123");
    expect(funcionario.cargo).toBe("Desenvolvedor");
    expect(funcionario.empresa_id).toBe("empresa-123");
    expect(funcionario.created_at).toBeInstanceOf(Date);
    expect(funcionario.updated_at).toBeNull();
  });

  it("deve criar uma instância de Funcionario com valores fornecidos", () => {
    const props: FuncionarioProps = {
      usuario_id: "user-123",
      cargo: "Desenvolvedor",
      empresa_id: "empresa-123",
      created_at: new Date("2023-01-01"),
      updated_at: new Date("2023-01-02"),
    };
    const funcionario = new Funcionario(props);

    expect(funcionario.usuario_id).toBe("user-123");
    expect(funcionario.cargo).toBe("Desenvolvedor");
    expect(funcionario.empresa_id).toBe("empresa-123");
    expect(funcionario.created_at).toEqual(new Date("2023-01-01"));
    expect(funcionario.updated_at).toEqual(new Date("2023-01-02"));
  });

  it("deve atualizar o cargo do Funcionario", () => {
    const props: FuncionarioProps = {
      usuario_id: "user-123",
      cargo: "Desenvolvedor",
      empresa_id: "empresa-123",
    };
    const funcionario = new Funcionario(props);

    funcionario.update("Gerente");

    expect(funcionario.cargo).toBe("Gerente");
    expect(funcionario.updated_at).toBeInstanceOf(Date);
  });
});
