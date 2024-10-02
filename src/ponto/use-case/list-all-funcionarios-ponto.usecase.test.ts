import {
  ListEmpresaPontosUseCase,
  Input,
} from "./list-all-funcionarios-ponto.usecase";
import {
  PontoInMemoryRepository,
  PontoRepository,
} from "../infra/ponto.repository";
import { Ponto } from "../domain/ponto";

describe("ListEmpresaPontosUseCase", () => {
  let pontoRepository: PontoRepository;
  let useCase: ListEmpresaPontosUseCase;

  const arrange = [
    new Ponto({ funcionario_id: "john", empresa_id: "1" }),
    new Ponto({ funcionario_id: "jane", empresa_id: "2" }),
    new Ponto({ funcionario_id: "john", empresa_id: "1" }),
    new Ponto({ funcionario_id: "jane", empresa_id: "2" }),
    new Ponto({ funcionario_id: "john", empresa_id: "1" }),
    new Ponto({ funcionario_id: "jane", empresa_id: "2" }),
    new Ponto({ funcionario_id: "john", empresa_id: "1" }),
    new Ponto({ funcionario_id: "jane", empresa_id: "2" }),
  ] as Ponto[];

  for (let i = 0; i < arrange.length - 2; i++) {
    arrange[i].fechar_ponto();
  }

  const closedPontos = arrange.filter((ponto) => ponto.checkout);

  const openPontos = arrange.filter((ponto) => !ponto.checkout);

  beforeEach(() => {
    pontoRepository = new PontoInMemoryRepository();

    arrange.forEach(async (ponto) => {
      await pontoRepository.save(ponto);
    });
    useCase = new ListEmpresaPontosUseCase(pontoRepository);
  });

  it("deve retorna pontos abertos de funcionario_id", async () => {
    let input: Input = { funcionario_id: "jane", status: "aberto" };
    let expectedPonto: Ponto = openPontos.filter(
      (ponto) => ponto.funcionario_id === "jane"
    )[0];

    let result = await useCase.execute(input);

    expect(result).toEqual(expectedPonto);

    input = { funcionario_id: "john", status: "aberto" };
    expectedPonto = openPontos.filter(
      (ponto) => ponto.funcionario_id === "john"
    )[0];

    result = await useCase.execute(input);

    expect(result).toEqual(expectedPonto);
  });

  it("deve retorna pontos fechados de funcionario_id", async () => {
    let input: Input = { funcionario_id: "jane", status: "fechado" };
    let expectedPonto: Ponto[] = closedPontos.filter(
      (ponto) => ponto.funcionario_id === "jane"
    );
    let result = await useCase.execute(input);

    expect(result).toEqual(expectedPonto);

    input = { funcionario_id: "john", status: "fechado" };
    expectedPonto = closedPontos.filter(
      (ponto) => ponto.funcionario_id === "john"
    );

    result = await useCase.execute(input);

    expect(result).toEqual(expectedPonto);
  });

  it("deve retonar todos os pontos de funcionario_id", async () => {
    let input: Input = { funcionario_id: "jane" };
    let expectedPonto: Ponto[] = arrange.filter(
      (ponto) => ponto.funcionario_id === "jane"
    );

    let result = await useCase.execute(input);

    expect(result).toEqual(expectedPonto);

    input = { funcionario_id: "john" };
    expectedPonto = arrange.filter((ponto) => ponto.funcionario_id === "john");

    result = await useCase.execute(input);

    expect(result).toEqual(expectedPonto);
  });
});
