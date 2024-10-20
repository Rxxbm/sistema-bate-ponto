import { ListEmpresasUseCase } from "./list-empresa.usecase";
import {
  EmpresaInMemoryRepository,
  EmpresaRepository,
} from "../infra/empresa.repository";
import { Empresa } from "../domain/empresa";

describe("ListEmpresasUseCase", () => {
  let empresaRepository: EmpresaRepository;
  let listEmpresasUseCase: ListEmpresasUseCase;

  beforeEach(() => {
    empresaRepository = new EmpresaInMemoryRepository();
    listEmpresasUseCase = new ListEmpresasUseCase(empresaRepository);
  });

  it("deve retornar uma lista de Empresas", async () => {
    const Empresas: Empresa[] = [
      new Empresa({ name: "john", cnpj: "1" }),
      new Empresa({ name: "jane", cnpj: "2" }),
      new Empresa({ name: "caleb", cnpj: "1" }),
      new Empresa({ name: "joseph", cnpj: "2" }),
      new Empresa({ name: "jonas", cnpj: "1" }),
      new Empresa({ name: "beth", cnpj: "2" }),
    ];
    const spyOnFindAll = jest.spyOn(empresaRepository, "findAll");

    Empresas.forEach(async (empresa) => {
      await empresaRepository.save(empresa);
    });

    const result = await listEmpresasUseCase.execute();

    expect(result).toEqual(Empresas);
    expect(empresaRepository.findAll).toHaveBeenCalledTimes(1);
    expect(spyOnFindAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar uma lista vazia de Empresas", async () => {
    const spyOnFindAll = jest.spyOn(empresaRepository, "findAll");

    const result = await listEmpresasUseCase.execute();

    expect(result).toEqual([]);
    expect(spyOnFindAll).toHaveBeenCalledTimes(1);
  });
});
