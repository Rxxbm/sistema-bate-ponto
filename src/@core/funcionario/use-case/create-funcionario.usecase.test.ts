import { CreateFuncionarioUseCase, Input, Output } from "./create-funcionario.usecase";
import { Funcionario } from "../domain/funcionario";
import { FuncionarioInMemoryRepository } from "../infra/funcionario.repository";

describe("CreateFuncionarioUseCase", () => {
  let funcionarioRepository: FuncionarioInMemoryRepository;
  let useCase: CreateFuncionarioUseCase;

  beforeEach(() => {
    funcionarioRepository = new FuncionarioInMemoryRepository();
    useCase = new CreateFuncionarioUseCase(funcionarioRepository);
  });

  it("deve criar um Funcionario e salvar com sucesso", async () => {
    const input: Input = {
      usuario_id: "any_usuario_id",
      cargo: "any_cargo",
      empresa_id: "any_empresa_id",
    };

    const spy = jest.spyOn(funcionarioRepository, "save");
    const funcionario = new Funcionario(input);

    const result = await useCase.execute(input);

    expect(spy).toHaveBeenCalledWith(funcionario);
    expect(result).toEqual(funcionario);
  });

  it("deve retornar um erro caso o usuario_id já esteja em uso", async () => {
    const input: Input = {
      usuario_id: "any_usuario_id",
      cargo: "any_cargo",
      empresa_id: "any_empresa_id",
    };

    // Cria um funcionário com o mesmo usuário para simular duplicação
    await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toThrow("Já existe um funcionário com esse usuário.");
  });
});
