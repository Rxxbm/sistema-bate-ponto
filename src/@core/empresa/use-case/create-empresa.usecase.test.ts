import { createEmpresaUseCase, Input, Output } from "./create-empresa.usecase";
import { Empresa } from "../domain/empresa";
import { EmpresaInMemoryRepository } from "../infra/empresa.repository";

describe("createEmpresaUseCase", () => {
  let EmpresaRepository: EmpresaInMemoryRepository;
  let useCase: createEmpresaUseCase;

  beforeEach(() => {
    EmpresaRepository = new EmpresaInMemoryRepository();

    useCase = new createEmpresaUseCase(
      EmpresaRepository
    );
  });

  it("deve criar um Empresa e salvar ele com sucesso", async () => {
    const input: Input = {
      name: "any_name",
      cnpj: "any_cnpj_id",
    };

    const spy = jest.spyOn(EmpresaRepository, "save");

    const empresa = new Empresa(input);


    const result = await useCase.execute(input);


    expect(spy).toHaveBeenCalledWith(empresa);
    expect(result).toEqual(empresa);
  });

  it("deve retornar um erro caso o cnpj já esteja em uso", async () => {
    const input: Input = {
      name: "any_name",
      cnpj: "any_cnpj_id",
    };

    const spy = jest.spyOn(EmpresaRepository, "save");

    const empresa = new Empresa(input);

    const result = await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toThrow('CNPJ já está em uso');
  });

});
