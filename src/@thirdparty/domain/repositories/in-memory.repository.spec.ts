import { UniqueEntityUUID } from "../value-objects/unique-id/unique-id";
import { InMemoryRepository } from "./in-memory.repository";

class Pessoa {
  id: UniqueEntityUUID | string;
  nome: string;
}

class Repository extends InMemoryRepository<Pessoa> {}

describe("Testando a Classe Abstrata InMemoryRepository", () => {
  let repository: Repository;

  beforeEach(() => {
    repository = new Repository();
  });

  test("Deve salvar uma entidade com sucesso", async () => {
    const pessoa = {
      id: "123",
      nome: "João",
    };
    await repository.save(pessoa);
    expect(await repository.findById("123")).toEqual(pessoa);
  });

  test("Deve emitir um erro caso a entidade não seja encontrada", async () => {
    await expect(repository._getid("invalid_id")).rejects.toThrow(
      new Error(`Entidade não encontrada com o id invalid_id`)
    );
  });

  test("Deve deletar uma entidade com sucesso", async () => {
    const pessoa = {
      id: "123",
      nome: "João",
    };
    await repository.save(pessoa);
    await repository.delete("123");
    await expect(repository._getid("123")).rejects.toThrow(
      new Error(`Entidade não encontrada com o id 123`)
    );
  });

  test("Deve atualizar uma entidade com sucesso", async () => {
    const pessoa = {
      id: "123",
      nome: "João",
    };
    await repository.save(pessoa);
    pessoa.nome = "Maria";
    await repository.update(pessoa);
    expect(await repository.findById("123")).toEqual({
      id: "123",
      nome: "Maria",
    });
  });

  test("Deve listar todas as entidades com sucesso", async () => {
    const arrange = [
      { id: "123", nome: "João" },
      { id: "456", nome: "Maria" },
      { id: "789", nome: "José" },
      { id: "101", nome: "Pedro" },
    ];
    arrange.forEach(async (pessoa) => {
      await repository.save(pessoa);
    });
    expect(await repository.findAll()).toEqual(arrange);
  });
});
