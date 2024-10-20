import { UseCase } from "../../@thirdparty/use-case/use-case.interface";
import { Configuracoes } from "../domain/configuracao";
import { ConfiguracoesRepository } from "../infra/configuracoes.repository";

export class FindConfiguracaoByEmpresaIdUseCase implements UseCase<Input, Output> {
  constructor(private readonly configuracaoRepository: ConfiguracoesRepository) {}

  async execute(data: Input): Promise<Output> {
    const configuracao = await this.configuracaoRepository.findByEmpresaId(data.empresa_id);

    if (!configuracao) {
      throw new Error("Configuração não encontrada para essa empresa.");
    }

    return configuracao;
  }
}

export type Input = {
  empresa_id: string;
};

export type Output = Configuracoes;
