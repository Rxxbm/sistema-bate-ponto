import { FuncionarioInMemoryRepository } from "./funcionario.repository";
import { FuncionarioProps, Funcionario } from "../domain/funcionario";

jest.mock("../../@thirdparty/domain/value-objects/unique-id/unique-id", () => {
  return {
    UniqueEntityUUID: jest.fn().mockImplementation((id) => {
      return {
        value: id || "any_id",
      };
    }),
  };
});

describe("FuncionarioInMemoryRepository", () => {
  let repository: FuncionarioInMemoryRepository;
  let funcionario: FuncionarioProps;

  beforeEach(() => {
    repository = new FuncionarioInMemoryRepository();
    funcionario = {
      id: "1",
      usuario_id: "user-123",
      cargo: "Desenvolvedor",
      empresa_id: "empresa-123",
    };
  });

  it("deve adicionar um Funcionario no repositorio", async () => {
    const funcionarioInstance = new Funcionario(funcionario);
    await repository.save(funcionarioInstance);
    const foundFuncionario = await repository.findById("1");
    expect(foundFuncionario).toEqual(funcionarioInstance);
  });

  it("deve atualizar um Funcionario no repositorio", async () => {
    const funcionarioInstance = new Funcionario(funcionario);
    await repository.save(funcionarioInstance);
    funcionarioInstance.update("Gerente");
    await repository.update(funcionarioInstance);
    const foundFuncionario = await repository.findById(funcionarioInstance.id);
    expect(foundFuncionario).toEqual(funcionarioInstance);
  });

  it("deve deletar um Funcionario no repositorio", async () => {
    const funcionarioInstance = new Funcionario(funcionario);
    await repository.save(funcionarioInstance);
    await repository.delete(funcionarioInstance.id);
    await expect(repository.findById(funcionarioInstance.id)).rejects.toThrow();
  });

  it("deve listar todos os Funcionarios no repositorio", async () => {
    const arrange = [
      new Funcionario({ ...funcionario, id: "1" }),
      new Funcionario({ ...funcionario, id: "2" }),
      new Funcionario({ ...funcionario, id: "3" }),
      new Funcionario({ ...funcionario, id: "4" }),
    ];
    arrange.forEach(async (funcionario) => await repository.save(funcionario));
    const funcionarios = await repository.findAll();
    expect(funcionarios).toEqual(arrange);
  });

  it("deve encontrar um Funcionario pelo usuario_id", async () => {
    const funcionarioInstance = new Funcionario(funcionario);
    await repository.save(funcionarioInstance);
    const foundFuncionario = await repository.findByUsuarioId("user-123");
    expect(foundFuncionario).toEqual(funcionarioInstance);
  });

  it("deve encontrar Funcionarios pela empresa_id", async () => {
    const arrange = [
      new Funcionario({ ...funcionario, id: "1", empresa_id: "empresa-123" }),
      new Funcionario({ ...funcionario, id: "2", empresa_id: "empresa-123" }),
      new Funcionario({ ...funcionario, id: "3", empresa_id: "empresa-456" }),
    ];
    arrange.forEach(async (funcionario) => await repository.save(funcionario));
    const funcionarios = await repository.findByEmpresaId("empresa-123");
    expect(funcionarios).toEqual([arrange[0], arrange[1]]);
  });
});
