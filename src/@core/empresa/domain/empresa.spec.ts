import { Empresa, empresaProps } from "./empresa";

describe("Empresa", () => {
  it("deve criar uma instância de Empresa com valores padrão", () => {
    const props: empresaProps = {
      name: "Empresa Teste",
      cnpj: "12345678901234",
    };
    const empresa = new Empresa(props);

    expect(empresa.id).toBeDefined();
    expect(empresa.name).toBe("Empresa Teste");
    expect(empresa.cnpj).toBe("12345678901234");
    expect(empresa.created_at).toBeInstanceOf(Date);
    expect(empresa.updated_at).toBeNull();
  });

  it("deve criar uma instância de Empresa com valores fornecidos", () => {
    const props: empresaProps = {
      name: "Empresa Teste",
      cnpj: "12345678901234",
      created_at: new Date("2023-01-01"),
      updated_at: new Date("2023-01-02"),
    };
    const empresa = new Empresa(props);

    expect(empresa.name).toBe("Empresa Teste");
    expect(empresa.cnpj).toBe("12345678901234");
    expect(empresa.created_at).toEqual(new Date("2023-01-01"));
    expect(empresa.updated_at).toEqual(new Date("2023-01-02"));
  });

  it("deve atualizar a instância de Empresa", () => {
    const props: empresaProps = {
      name: "Empresa Teste",
      cnpj: "12345678901234",
    };
    const empresa = new Empresa(props);

    empresa.update("Empresa Atualizada", "98765432109876");

    expect(empresa.name).toBe("Empresa Atualizada");
    expect(empresa.cnpj).toBe("98765432109876");
    expect(empresa.updated_at).toBeInstanceOf(Date);
  });
});
