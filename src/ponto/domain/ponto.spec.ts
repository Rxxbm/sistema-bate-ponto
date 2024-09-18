import { Ponto } from "./ponto";

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
        })
    ).toThrow(
      new Error("A data de checkout não pode ser menor que a data de checkin")
    );
  });
});
