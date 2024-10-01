import { closePontoUseCase, Input, Output } from "./close-ponto.usecase";
import {
  PontoInMemoryRepository,
  PontoRepository,
} from "../infra/ponto.repository";
import { QueueInterface } from "../../@thirdparty/infra/queue.interface";
import { Ponto } from "../domain/ponto";

describe("closePontoUseCase", () => {
  let pontoRepository: PontoRepository;
  let queue: QueueInterface;
  let useCase: closePontoUseCase;

  beforeEach(() => {
    pontoRepository = new PontoInMemoryRepository();

    queue = {
      removeJob: jest.fn(),
    } as unknown as QueueInterface;

    useCase = new closePontoUseCase(pontoRepository, queue);
  });

  it("deve fechar um ponto com sucesso", async () => {
    const spyFindOpenPonto = jest.spyOn(
      pontoRepository,
      "findOpenPontoByFuncionarioId"
    );
    const spyUpdate = jest.spyOn(pontoRepository, "update");

    const ponto = new Ponto({
      funcionario_id: "funcionario1",
      empresa_id: "empresa1",
    });

    const spyFecharPonto = jest.spyOn(ponto, "fechar_ponto");

    await pontoRepository.save(ponto);

    const result = await useCase.execute({ funcionario_id: "funcionario1" });

    expect(spyFindOpenPonto).toHaveBeenCalledWith("funcionario1");
    expect(spyFecharPonto).toHaveBeenCalled();
    expect(spyUpdate).toHaveBeenCalledWith(ponto);
    expect(queue.removeJob).toHaveBeenCalledWith(ponto.id);
    expect(result).toBe(ponto);
  });

  it("deve retornar um erro se não houver nenhum ponto aberto", async () => {
    const spyFindOpenPonto = jest.spyOn(
      pontoRepository,
      "findOpenPontoByFuncionarioId"
    );
    const spyUpdate = jest.spyOn(pontoRepository, "update");

    const input: Input = {
      funcionario_id: "funcionario1",
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      "Não existe um ponto aberto para esse funcionário"
    );

    expect(spyFindOpenPonto).toHaveBeenCalledWith(input.funcionario_id);
    expect(spyUpdate).not.toHaveBeenCalled();
    expect(queue.removeJob).not.toHaveBeenCalled();
  });
});
