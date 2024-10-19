import { ListPontosUseCase } from "./list-ponto.usecase";
import {
  PontoInMemoryRepository,
  PontoRepository,
} from "../infra/ponto.repository";
import { Ponto } from "../domain/ponto";

describe("ListPontosUseCase", () => {
  let pontoRepository: PontoRepository;
  let listPontosUseCase: ListPontosUseCase;

  beforeEach(() => {
    pontoRepository = new PontoInMemoryRepository();
    listPontosUseCase = new ListPontosUseCase(pontoRepository);
  });

  it("deve retornar uma lista de pontos", async () => {
    const pontos: Ponto[] = [
      new Ponto({ funcionario_id: "john", empresa_id: "1" }),
      new Ponto({ funcionario_id: "jane", empresa_id: "2" }),
      new Ponto({ funcionario_id: "caleb", empresa_id: "1" }),
      new Ponto({ funcionario_id: "joseph", empresa_id: "2" }),
      new Ponto({ funcionario_id: "jonas", empresa_id: "1" }),
      new Ponto({ funcionario_id: "beth", empresa_id: "2" }),
    ];
    const spyOnFindAll = jest.spyOn(pontoRepository, "findAll");

    pontos.forEach(async (ponto) => {
      await pontoRepository.save(ponto);
    });

    const result = await listPontosUseCase.execute();

    expect(result).toEqual(pontos);
    expect(pontoRepository.findAll).toHaveBeenCalledTimes(1);
    expect(spyOnFindAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar uma lista vazia de pontos", async () => {
    const spyOnFindAll = jest.spyOn(pontoRepository, "findAll");

    const result = await listPontosUseCase.execute();

    expect(result).toEqual([]);
    expect(spyOnFindAll).toHaveBeenCalledTimes(1);
  });
});
