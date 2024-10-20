import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Configuracoes } from "../domain/configuracao";
import { ConfiguracoesRepository } from "../infra/configuracoes.repository";

export class CreateConfiguracaoUseCase implements UseCase<Input, Output> {
  constructor(private readonly configuracaoRepository: ConfiguracoesRepository) {}

  async execute(data: Input): Promise<Output> {
    if (await this.configuracaoRepository.findByEmpresaId(data.empresa_id)) {
      throw new Error("Configuração para essa empresa já existe.");
    }

    const configuracao = new Configuracoes(data);
    await this.configuracaoRepository.save(configuracao);

    return configuracao;
  }
}

export type Input = {
  empresa_id: string;
  min_semanal: string;
  max_diaria: string;
  intervalo_min: string;
  intervalo_max: string;
};

export type Output = Configuracoes;
