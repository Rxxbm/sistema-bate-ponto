import { EmpresaInMemoryRepository } from "./empresa.repository";
import { empresaProps, Empresa } from "../domain/empresa";

jest.mock("../../@thirdparty/domain/value-objects/unique-id/unique-id", () => {
  return {
    UniqueEntityUUID: jest.fn().mockImplementation((id) => {
      return {
        value: id || "any_id",
      };
    }),
  };
});

describe("EmpresaInMemoryRepository", () => {
  let repository: EmpresaInMemoryRepository;
  let empresa: empresaProps;

  beforeEach(() => {
    repository = new EmpresaInMemoryRepository();
    empresa = {
      id: "1",
      name: "any_empresa_id",
      cnpj: "any_funcionario_id",
    };
  });

  it("deve adicionar um Empresa no repositorio", async () => {
    const EmpresaInstance = new Empresa(empresa);
    await repository.save(EmpresaInstance);
    const foundEmpresa = await repository.findById("1");
    expect(foundEmpresa).toEqual(EmpresaInstance);
  });

  it("deve atualizar um Empresa no repositorio", async () => {
    const EmpresaInstance = new Empresa(empresa);
    await repository.save(EmpresaInstance);
    EmpresaInstance.update("Empresa Atualizada", "98765432109876");
    await repository.update(EmpresaInstance);
    const foundEmpresa = await repository.findById(EmpresaInstance.id);
    expect(foundEmpresa).toEqual(EmpresaInstance);
  });

  it("deve deletar um Empresa no repositorio", async () => {
    const EmpresaInstance = new Empresa(empresa);
    await repository.save(EmpresaInstance);
    await repository.delete(EmpresaInstance.id);
    await expect(repository.findById(EmpresaInstance.id)).rejects.toThrow();
  });

  it("deve listar todos os Empresas no repositorio", async () => {
    const arrange = [
      new Empresa({ ...empresa, id: "1" }),
      new Empresa({ ...empresa, id: "2" }),
      new Empresa({ ...empresa, id: "3" }),
      new Empresa({ ...empresa, id: "4" }),
    ];
    arrange.forEach(async (Empresa) => await repository.save(Empresa));
    const Empresas = await repository.findAll();
    expect(Empresas).toEqual(arrange);
  });

});
