import { PontoInMemoryRepository } from "./ponto.repository";
import { pontoProps, Ponto } from "../domain/ponto";

jest.mock("../../@thirdparty/domain/value-objects/unique-id/unique-id", () => {
  return {
    UniqueEntityUUID: jest.fn().mockImplementation((id) => {
      return {
        value: id || "any_id",
      };
    }),
  };
});

describe("PontoInMemoryRepository", () => {
  let repository: PontoInMemoryRepository;
  let ponto: pontoProps;

  beforeEach(() => {
    repository = new PontoInMemoryRepository();
    ponto = {
      id: "1",
      empresa_id: "any_empresa_id",
      funcionario_id: "any_funcionario_id",
      checkin: new Date(),
    };
  });

  it("deve adicionar um ponto no repositorio", async () => {
    const pontoInstance = new Ponto(ponto);
    await repository.save(pontoInstance);
    const foundPonto = await repository.findById("1");
    expect(foundPonto).toEqual(pontoInstance);
  });

  it("deve atualizar um ponto no repositorio", async () => {
    const pontoInstance = new Ponto(ponto);
    await repository.save(pontoInstance);
    const updatedPonto = new Ponto({ ...ponto, empresa_id: "2" });
    await repository.update(updatedPonto);
    const foundPonto = await repository.findById(updatedPonto.id);
    expect(foundPonto).toEqual(updatedPonto);
  });

  it("deve deletar um ponto no repositorio", async () => {
    const pontoInstance = new Ponto(ponto);
    await repository.save(pontoInstance);
    await repository.delete(pontoInstance.id);
    await expect(repository.findById(pontoInstance.id)).rejects.toThrow();
  });

  it("deve listar todos os pontos no repositorio", async () => {
    const arrange = [
      new Ponto({ ...ponto, id: "1" }),
      new Ponto({ ...ponto, id: "2" }),
      new Ponto({ ...ponto, id: "3" }),
      new Ponto({ ...ponto, id: "4" }),
    ];
    arrange.forEach(async (ponto) => await repository.save(ponto));
    const pontos = await repository.findAll();
    expect(pontos).toEqual(arrange);
  });

  it("deve listar todos os pontos de uma empresa no repositorio", async () => {
    const arrange = [
      new Ponto({ ...ponto, id: "1", empresa_id: "1" }),
      new Ponto({ ...ponto, id: "2", empresa_id: "1" }),
      new Ponto({ ...ponto, id: "3", empresa_id: "2" }),
      new Ponto({ ...ponto, id: "4", empresa_id: "2" }),
    ];

    arrange.forEach(async (ponto) => await repository.save(ponto));

    const closedPonto = new Ponto({ ...ponto, id: "5", empresa_id: "1" });
    closedPonto.fechar_ponto();

    await repository.save(closedPonto);

    let pontos = await repository.findByEmpresaId("1");
    expect(pontos).toEqual([arrange[0], arrange[1], closedPonto]);

    pontos = await repository.findByEmpresaId("2");
    expect(pontos).toEqual([arrange[2], arrange[3]]);
  });

  it("deve listar todos os pontos abertos de uma empresa no repositorio", async () => {
    const arrange = [
      new Ponto({ ...ponto, id: "1", empresa_id: "1" }),
      new Ponto({ ...ponto, id: "2", empresa_id: "1" }),
      new Ponto({ ...ponto, id: "3", empresa_id: "2" }),
      new Ponto({ ...ponto, id: "4", empresa_id: "2" }),
    ];

    arrange.forEach(async (ponto) => await repository.save(ponto));

    const closedPonto = new Ponto({ ...ponto, id: "5", empresa_id: "1" });
    closedPonto.fechar_ponto();

    await repository.save(closedPonto);

    let pontos = await repository.findAllOpenPontoByEmpresaId("1");
    expect(pontos).toEqual([arrange[0], arrange[1]]);

    pontos = await repository.findAllOpenPontoByEmpresaId("2");
    expect(pontos).toEqual([arrange[2], arrange[3]]);
  });

  it("deve listar todos os pontos fechados de uma empresa no repositorio", async () => {
    const arrange = [
      new Ponto({ ...ponto, id: "1", empresa_id: "1" }),
      new Ponto({ ...ponto, id: "2", empresa_id: "1" }),
      new Ponto({ ...ponto, id: "3", empresa_id: "2" }),
      new Ponto({ ...ponto, id: "4", empresa_id: "2" }),
    ];

    arrange.forEach(async (ponto) => await repository.save(ponto));

    const closedPonto = new Ponto({ ...ponto, id: "5", empresa_id: "1" });
    closedPonto.fechar_ponto();

    await repository.save(closedPonto);

    let pontos = await repository.findAllClosedPontoByEmpresaId("1");
    expect(pontos).toEqual([closedPonto]);

    pontos = await repository.findAllClosedPontoByEmpresaId("2");
    expect(pontos).toEqual([]);
  });
});
