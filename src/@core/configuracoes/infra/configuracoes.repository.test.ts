import { ConfiguracoesInMemoryRepository } from "./configuracoes.repository";
import { configuracoesProps, Configuracoes } from "../domain/configuracao";

jest.mock("../../@thirdparty/domain/value-objects/unique-id/unique-id", () => {
  return {
    UniqueEntityUUID: jest.fn().mockImplementation((id) => {
      return {
        value: id || "any_id",
      };
    }),
  };
});

describe("ConfiguracoesInMemoryRepository", () => {
  let repository: ConfiguracoesInMemoryRepository;
  let configuracao: configuracoesProps;

  beforeEach(() => {
    repository = new ConfiguracoesInMemoryRepository();
    configuracao = {
      id: "1",
      empresa_id: "empresa_1",
      min_semanal: "20h",
      max_diaria: "8h",
      intervalo_min: "1h",
      intervalo_max: "2h",
    };
  });

  it("deve adicionar uma Configuração no repositório", async () => {
    const configuracaoInstance = new Configuracoes(configuracao);
    await repository.save(configuracaoInstance);
    const foundConfiguracao = await repository.findById("1");
    expect(foundConfiguracao).toEqual(configuracaoInstance);
  });

  it("deve atualizar uma Configuração no repositório", async () => {
    const configuracaoInstance = new Configuracoes(configuracao);
    await repository.save(configuracaoInstance);
    configuracaoInstance.update("8h", "25h", "9h", "1.5h");
    await repository.update(configuracaoInstance);
    const foundConfiguracao = await repository.findById(configuracaoInstance.id);
    expect(foundConfiguracao).toEqual(configuracaoInstance);
  });

  it("deve deletar uma Configuração no repositório", async () => {
    const configuracaoInstance = new Configuracoes(configuracao);
    await repository.save(configuracaoInstance);
    await repository.delete(configuracaoInstance.id);
    await expect(repository.findById(configuracaoInstance.id)).rejects.toThrow();
  });

  it("deve listar todas as Configurações no repositório", async () => {
    const arrange = [
      new Configuracoes({ ...configuracao, id: "1" }),
      new Configuracoes({ ...configuracao, id: "2" }),
      new Configuracoes({ ...configuracao, id: "3" }),
      new Configuracoes({ ...configuracao, id: "4" }),
    ];
    for (const configuracaoItem of arrange) {
      await repository.save(configuracaoItem);
    }
    const configuracoes = await repository.findAll();
    expect(configuracoes).toEqual(arrange);
  });

  it("deve encontrar uma Configuração por empresa_id", async () => {
    const configuracaoInstance = new Configuracoes(configuracao);
    await repository.save(configuracaoInstance);
    const foundConfiguracao = await repository.findByEmpresaId("empresa_1");
    expect(foundConfiguracao).toEqual(configuracaoInstance);
  });
});
