import { Configuracoes } from "../domain/configuracao";
import { ConfiguracoesRepository } from "../infra/configuracoes.repository";

export class ListConfiguracoesUseCase {
  constructor(private configuracoesRepository: ConfiguracoesRepository) {}

  async execute(): Promise<Configuracoes[]> {
    return await this.configuracoesRepository.findAll();
  }
}

export type Output = Configuracoes[];
