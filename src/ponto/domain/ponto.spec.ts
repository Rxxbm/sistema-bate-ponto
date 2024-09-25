import { Ponto } from "./ponto";

jest.mock("../../@thirdparty/domain/value-objects/unique-id/unique-id", () => {
  return {
    UniqueEntityUUID: jest.fn().mockImplementation((id) => {
      return {
        value: id || "any_id",
      };
    }),
  };
});

describe("Testes Unitarios da Classe Ponto", () => {
  test("Deve emitir um erro se o checkin for maior que a data atual", () => {
    const data = new Date();
    data.setDate(data.getDate() + 1);
    expect(
      () =>
        new Ponto({
          id: "1",
          funcionario_id: "1",
          checkin: data,
          empresa_id: "1",
        })
    ).toThrow(
      new Error("A data de checkin não pode ser maior que a data atual")
    );
  });

  test("Deve emitir um erro se o checkout for menor que o checkin", () => {
    const data = new Date();
    data.setDate(data.getDate() - 1);

    expect(
      () =>
        new Ponto({
          id: "1",
          funcionario_id: "1",
          checkout: data,
          empresa_id: "1",
        })
    ).toThrow(
      new Error("A data de checkout não pode ser menor que a data de checkin")
    );
  });

  test("Deve criar um ponto com sucesso", () => {
    const ponto = new Ponto({
      id: "1",
      funcionario_id: "1",
      empresa_id: "1",
    });

    expect(ponto).toBeInstanceOf(Ponto);
    expect(ponto.id).toBe("1");
    expect(ponto.funcionario_id).toBe("1");
  });

  test("Deve fechar um ponto com sucesso", () => {
    const ponto = new Ponto({
      id: "1",
      funcionario_id: "1",
      empresa_id: "1",
    });

    ponto.fechar_ponto();

    expect(ponto.checkout).toBeInstanceOf(Date);
    expect(ponto.checkout).not.toBeNull();
  });

  test("Deve atualizar o funcionario_id com sucesso", () => {
    const ponto = new Ponto({
      id: "1",
      funcionario_id: "1",
      empresa_id: "1",
    });

    ponto.update("any_funcionario_id", "any_empresa_id");

    expect(ponto.funcionario_id).toBe("any_funcionario_id");
    expect(ponto.empresa_id).toBe("any_empresa_id");
  });
});
