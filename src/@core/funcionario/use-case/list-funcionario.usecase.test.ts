import { ListFuncionariosUseCase } from "./list-funcionario.usecase";
import {
  FuncionarioInMemoryRepository,
  FuncionarioRepository,
} from "../infra/funcionario.repository";
import { Funcionario } from "../domain/funcionario";

describe("ListFuncionariosUseCase", () => {
  let funcionarioRepository: FuncionarioRepository;
  let listFuncionariosUseCase: ListFuncionariosUseCase;

  beforeEach(() => {
    funcionarioRepository = new FuncionarioInMemoryRepository();
    listFuncionariosUseCase = new ListFuncionariosUseCase(funcionarioRepository);
  });

  it("deve retornar uma lista de Funcionarios", async () => {
    const funcionarios: Funcionario[] = [
      new Funcionario({ usuario_id: "1", cargo: "cargo1", empresa_id: "empresa1" }),
      new Funcionario({ usuario_id: "2", cargo: "cargo2", empresa_id: "empresa1" }),
      new Funcionario({ usuario_id: "3", cargo: "cargo3", empresa_id: "empresa2" }),
      new Funcionario({ usuario_id: "4", cargo: "cargo4", empresa_id: "empresa2" }),
    ];
    const spyOnFindAll = jest.spyOn(funcionarioRepository, "findAll");

    for (const funcionario of funcionarios) {
      await funcionarioRepository.save(funcionario);
    }

    const result = await listFuncionariosUseCase.execute();

    expect(result).toEqual(funcionarios);
    expect(funcionarioRepository.findAll).toHaveBeenCalledTimes(1);
    expect(spyOnFindAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar uma lista vazia de Funcionarios", async () => {
    const spyOnFindAll = jest.spyOn(funcionarioRepository, "findAll");

    const result = await listFuncionariosUseCase.execute();

    expect(result).toEqual([]);
    expect(spyOnFindAll).toHaveBeenCalledTimes(1);
  });
});
