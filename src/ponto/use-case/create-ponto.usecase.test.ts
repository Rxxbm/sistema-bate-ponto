import { createPontoUseCase, Input, Output } from "./create-ponto.usecase";
import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Ponto } from "../domain/ponto";
import { PontoInMemoryRepository } from "../infra/ponto.repository";

describe("createPontoUseCase", () => {
  let pontoRepository: PontoInMemoryRepository;
  let findEmpresaById: UseCase<any, any>;
  let findFuncionarioById: UseCase<any, any>;
  let useCase: createPontoUseCase;

  beforeEach(() => {
    pontoRepository = new PontoInMemoryRepository();

    findEmpresaById = {
      execute: jest.fn(),
    } as unknown as UseCase<any, any>;

    findFuncionarioById = {
      execute: jest.fn(),
    } as unknown as UseCase<any, any>;

    useCase = new createPontoUseCase(
      pontoRepository,
      findEmpresaById,
      findFuncionarioById
    );
  });

  it("deve criar um ponto e salvar ele com sucesso", async () => {
    const input: Input = {
      empresa_id: "any_empresa_id",
      funcionario_id: "any_funcionario_id",
    };

    const ponto = new Ponto(input);
    await pontoRepository.save(ponto);

    const result = await useCase.execute(input);

    expect(findEmpresaById.execute).toHaveBeenCalledWith({
      id: input.empresa_id,
    });
    expect(findFuncionarioById.execute).toHaveBeenCalledWith({
      id: input.funcionario_id,
    });
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
});
