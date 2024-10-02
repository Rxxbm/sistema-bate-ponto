import { ListEmpresaPontosUseCase, Input } from "./list-empresa-pontos.usecase";
import {
  PontoInMemoryRepository,
  PontoRepository,
} from "../infra/ponto.repository";
import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";

describe("ListEmpresaPontosUseCase", () => {
  let pontoRepository: PontoRepository;
  let findUsuarioById: jest.Mocked<UseCase<any, any>>;
  let findFuncionarioByUsuarioId: jest.Mocked<UseCase<any, any>>;
  let listEmpresaPontosUseCase: ListEmpresaPontosUseCase;
  const arrange = [
    new Ponto({ funcionario_id: "john", empresa_id: "1" }),
    new Ponto({ funcionario_id: "jane", empresa_id: "2" }),
    new Ponto({ funcionario_id: "caleb", empresa_id: "1" }),
    new Ponto({ funcionario_id: "joseph", empresa_id: "2" }),
    new Ponto({ funcionario_id: "jonas", empresa_id: "1" }),
    new Ponto({ funcionario_id: "beth", empresa_id: "2" }),
    new Ponto({ funcionario_id: "leonard", empresa_id: "1" }),
    new Ponto({ funcionario_id: "jeffrey", empresa_id: "2" }),
  ] as Ponto[];

  arrange
    .filter((ponto) => ponto.funcionario_id[0] === "j")
    .map((ponto) => ponto.fechar_ponto());

  const openPontos = arrange.filter((ponto) => !ponto.checkout);
  const closedPontos = arrange.filter((ponto) => ponto.checkout);

  beforeEach(() => {
    pontoRepository = new PontoInMemoryRepository();

    arrange.forEach(async (ponto) => {
      await pontoRepository.save(ponto);
    });

    findUsuarioById = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UseCase<any, any>>;

    findFuncionarioByUsuarioId = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UseCase<any, any>>;

    listEmpresaPontosUseCase = new ListEmpresaPontosUseCase(
      pontoRepository,
      findUsuarioById,
      findFuncionarioByUsuarioId
    );
  });

  it("deve retornar todos os pontos abertos de empresa_id se o usuario for RH", async () => {
    const input: Input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
      status: "aberto",
    };

    findUsuarioById.execute.mockResolvedValue({ role: "RH" });
    findFuncionarioByUsuarioId.execute.mockResolvedValue({ empresa_id: "1" });

    const output = await listEmpresaPontosUseCase.execute(input);

    const expectedOutput = openPontos.filter(
      (ponto) => ponto.empresa_id === "1"
    );

    expect(output).toEqual(expectedOutput);
  });

  it("deve retornar todos os pontos fechados de empresa_id se o usuario for RH", async () => {
    const input: Input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
      status: "fechado",
    };

    findUsuarioById.execute.mockResolvedValue({ role: "RH" });
    findFuncionarioByUsuarioId.execute.mockResolvedValue({ empresa_id: "1" });

    const output = await listEmpresaPontosUseCase.execute(input);

    const expectedOutput = closedPontos.filter(
      (ponto) => ponto.empresa_id === "1"
    );

    expect(output).toEqual(expectedOutput);
  });
});
