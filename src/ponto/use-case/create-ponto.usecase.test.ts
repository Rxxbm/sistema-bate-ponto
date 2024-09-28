import { createPontoUseCase, Input, Output } from "./create-ponto.usecase";
import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";
import { PontoInMemoryRepository } from "../infra/ponto.repository";
import { Queue } from "../../@thirdparty/infra/queue.interface";

describe("createPontoUseCase", () => {
  let pontoRepository: PontoInMemoryRepository;
  let findEmpresaById: UseCase<any, any>;
  let findFuncionarioById: UseCase<any, any>;
  let findConfiguracaoByEmpresaId: UseCase<any, any>;
  let queue: Queue;
  let useCase: createPontoUseCase;

  beforeEach(() => {
    pontoRepository = new PontoInMemoryRepository();

    findEmpresaById = {
      execute: jest.fn(),
    } as unknown as UseCase<any, any>;

    findFuncionarioById = {
      execute: jest.fn().mockResolvedValue({ email: "any_email" }),
    } as unknown as UseCase<any, any>;

    findConfiguracaoByEmpresaId = {
      execute: jest.fn().mockResolvedValue({ intervalo_maximo: 60 }),
    } as unknown as UseCase<any, any>;

    queue = {
      add: jest.fn(),
    } as unknown as Queue;

    useCase = new createPontoUseCase(
      pontoRepository,
      findEmpresaById,
      findFuncionarioById,
      findConfiguracaoByEmpresaId,
      queue
    );
  });

  it("deve criar um ponto e salvar ele com sucesso", async () => {
    const input: Input = {
      empresa_id: "any_empresa_id",
      funcionario_id: "any_funcionario_id",
    };

    const spy = jest.spyOn(pontoRepository, "save");

    const ponto = new Ponto(input);

    const result = await useCase.execute(input);

    expect(findEmpresaById.execute).toHaveBeenCalledWith({
      id: input.empresa_id,
    });
    expect(findFuncionarioById.execute).toHaveBeenCalledWith({
      id: input.funcionario_id,
    });
    expect(spy).toHaveBeenCalledWith(ponto);
    expect(result).toEqual(ponto);
  });

  it("deve retornar um erro se o empresa_id for invalido", async () => {
    const input: Input = {
      empresa_id: "invalid_empresa_id",
      funcionario_id: "any_funcionario_id",
    };

    const spy = jest.spyOn(pontoRepository, "save");

    (findEmpresaById.execute as jest.Mock).mockRejectedValue(
      new Error("Empresa não encontrada")
    );

    await expect(useCase.execute(input)).rejects.toThrow(
      "Empresa não encontrada"
    );
    expect(findEmpresaById.execute).toHaveBeenCalledWith({
      id: input.empresa_id,
    });
    expect(findFuncionarioById.execute).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it("deve retornar um erro se o funcionario_id for invalido", async () => {
    const input: Input = {
      empresa_id: "any_empresa_id",
      funcionario_id: "invalid_funcionario_id",
    };

    (findFuncionarioById.execute as jest.Mock).mockRejectedValue(
      new Error("Funcionário não encontrado")
    );

    await expect(useCase.execute(input)).rejects.toThrow(
      "Funcionário não encontrado"
    );
    expect(findFuncionarioById.execute).toHaveBeenCalledWith({
      id: input.funcionario_id,
    });
  });

  it("deve retornar um erro se o funcionario já possuir um ponto aberto", async () => {
    const input: Input = {
      empresa_id: "any_empresa_id",
      funcionario_id: "any_funcionario_id_with_open_ponto",
    };

    const ponto = new Ponto(input);
    await useCase.execute(ponto);

    await expect(useCase.execute(input)).rejects.toThrow(
      new Error("Já existe um ponto aberto para esse funcionário")
    );
  });
});
