import { FindFuncionariosByEmpresaIdUseCase, Input, Output } from "./list-funcionario-by-empresa_id";
import { FuncionarioInMemoryRepository, FuncionarioRepository } from "../infra/funcionario.repository";
import { Funcionario } from "../domain/funcionario";

describe("FindFuncionariosByEmpresaIdUseCase", () => {
  let funcionarioRepository: FuncionarioRepository;
  let findFuncionariosByEmpresaIdUseCase: FindFuncionariosByEmpresaIdUseCase;

  beforeEach(() => {
    funcionarioRepository = new FuncionarioInMemoryRepository();
    findFuncionariosByEmpresaIdUseCase = new FindFuncionariosByEmpresaIdUseCase(funcionarioRepository);
  });

  it("deve retornar uma lista de funcionários quando encontrada", async () => {
    const funcionario1 = new Funcionario({ empresa_id: "empresa_1", cargo: "cargo_1", usuario_id: "usuario_1" });
    const funcionario2 = new Funcionario({ empresa_id: "empresa_1", cargo: "cargo_2", usuario_id: "usuario_2" });
    const input: Input = { empresa_id: "empresa_1" };

    await funcionarioRepository.save(funcionario1);
    await funcionarioRepository.save(funcionario2);

    const result: Output = await findFuncionariosByEmpresaIdUseCase.execute(input);

    expect(result).toEqual([funcionario1, funcionario2]);
  });

  it("deve retornar um erro quando não houver funcionários para a empresa especificada", async () => {
    const input: Input = { empresa_id: "empresa_inexistente" };

    await expect(findFuncionariosByEmpresaIdUseCase.execute(input)).rejects.toThrow("Nenhum funcionário encontrado para a empresa especificada");
  });
});
