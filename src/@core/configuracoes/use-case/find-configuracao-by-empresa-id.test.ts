import { FindConfiguracaoByEmpresaIdUseCase } from "./find-configuracao-by-empresa-id";
import { ConfiguracoesInMemoryRepository } from "../infra/configuracoes.repository";
import { Configuracoes } from "../domain/configuracao";

describe("FindConfiguracaoByEmpresaIdUseCase", () => {
  let configuracaoRepository: ConfiguracoesInMemoryRepository;
  let findConfiguracaoByEmpresaIdUseCase: FindConfiguracaoByEmpresaIdUseCase;

  beforeEach(() => {
    configuracaoRepository = new ConfiguracoesInMemoryRepository();
    findConfiguracaoByEmpresaIdUseCase = new FindConfiguracaoByEmpresaIdUseCase(configuracaoRepository);
  });

  it("deve retornar uma configuração ao encontrar pelo empresa_id", async () => {
    const configuracao = new Configuracoes({
      empresa_id: "empresa_1",
      min_semanal: "20h",
      max_diaria: "8h",
      intervalo_min: "1h",
      intervalo_max: "2h",
    });

    await configuracaoRepository.save(configuracao);

    const foundConfiguracao = await findConfiguracaoByEmpresaIdUseCase.execute({ empresa_id: "empresa_1" });

    expect(foundConfiguracao).toEqual(configuracao);
  });

  it("deve lançar erro ao não encontrar configuração pelo empresa_id", async () => {
    await expect(
      findConfiguracaoByEmpresaIdUseCase.execute({ empresa_id: "empresa_nao_existente" })
    ).rejects.toThrow("Configuração não encontrada para essa empresa.");
  });
});
