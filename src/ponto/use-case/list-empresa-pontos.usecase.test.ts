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

  it("deve retornar todos os pontos de empresa_id se o usuario for RH e o status não é informado", async () => {
    const input: Input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
    };

    findUsuarioById.execute.mockResolvedValue({ role: "RH" });
    findFuncionarioByUsuarioId.execute.mockResolvedValue({ empresa_id: "1" });

    const output = await listEmpresaPontosUseCase.execute(input);

    const expectedOutput = arrange.filter((ponto) => ponto.empresa_id === "1");

    expect(output).toEqual(expectedOutput);
  });

  it("deve retornar todos os pontos de empresa_id se o usuario for ADMIN", async () => {
    const input: Input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
    };

    findUsuarioById.execute.mockResolvedValue({ role: "ADMIN" });

    const output = await listEmpresaPontosUseCase.execute(input);

    const expectedOutput = arrange.filter((ponto) => ponto.empresa_id === "1");

    expect(output).toEqual(expectedOutput);
  });

  it("deve retornar todos os pontos abertos e fechados de empresa_id se o usuario for ADMIN", async () => {
    let input: Input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
      status: "aberto",
    };

    findUsuarioById.execute.mockResolvedValue({ role: "ADMIN" });

    let output = await listEmpresaPontosUseCase.execute(input);

    let expectedOutput = openPontos.filter((ponto) => ponto.empresa_id === "1");

    expect(output).toEqual(expectedOutput);

    input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
      status: "fechado",
    };

    output = await listEmpresaPontosUseCase.execute(input);

    expectedOutput = closedPontos.filter((ponto) => ponto.empresa_id === "1");

    expect(output).toEqual(expectedOutput);
  });

  it("deve retornar um erro se o funcionario RH não pertencer a empresa_id ou não for encontrado", async () => {
    const input: Input = {
      usuario_id: "any_usuarioId",
      empresa_id: "1",
    };

    findUsuarioById.execute.mockResolvedValue({ role: "RH" });
    findFuncionarioByUsuarioId.execute.mockResolvedValue({ empresa_id: "2" });

    await expect(listEmpresaPontosUseCase.execute(input)).rejects.toThrow(
      "Funcionário não encontrado ou não pertence a empresa"
    );
  });
});
