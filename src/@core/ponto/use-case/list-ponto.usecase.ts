import { Ponto } from "../domain/ponto";
import { PontoRepository } from "../infra/ponto.repository";

export class ListPontosUseCase {
  constructor(private pontoRepository: PontoRepository) {}

  async execute(): Promise<Ponto[]> {
    return this.pontoRepository.findAll();
  }
}

export type Output = Ponto[];
