import { Empresa } from "../domain/empresa";
import { EmpresaRepository } from "../infra/empresa.repository";

export class ListEmpresasUseCase {
  constructor(private pontoRepository: EmpresaRepository) {}

  async execute(): Promise<Empresa[]> {
    return this.pontoRepository.findAll();
  }
}

export type Output = Empresa[];
