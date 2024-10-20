import { CreateConfiguracaoUseCase } from "./create-configuracao.usecase";
import { ConfiguracoesInMemoryRepository } from "../infra/configuracoes.repository";

describe("CreateConfiguracaoUseCase", () => {
  let configuracaoRepository: ConfiguracoesInMemoryRepository;
  let createConfiguracaoUseCase: CreateConfiguracaoUseCase;

  beforeEach(() => {
    configuracaoRepository = new ConfiguracoesInMemoryRepository();
    createConfiguracaoUseCase = new CreateConfiguracaoUseCase(configuracaoRepository);
  });

  it("deve criar uma configuração", async () => {
    const input = {
      empresa_id: "empresa_1",
      min_semanal: "20h",
      max_diaria: "8h",
      intervalo_min: "1h",
      intervalo_max: "2h",
    };

    const configuracao = await createConfiguracaoUseCase.execute(input);

    expect(configuracao.empresa_id).toEqual(input.empresa_id);
    expect(configuracao.min_semanal).toEqual(input.min_semanal);
    expect(configuracao.max_diaria).toEqual(input.max_diaria);
    expect(configuracao.intervalo_min).toEqual(input.intervalo_min);
    expect(configuracao.intervalo_max).toEqual(input.intervalo_max);
  });

  it("deve lançar erro ao tentar criar uma configuração para uma empresa já existente", async () => {
    const input = {
      empresa_id: "empresa_1",
      min_semanal: "20h",
      max_diaria: "8h",
      intervalo_min: "1h",
      intervalo_max: "2h",
    };

    // Cria a configuração inicial
    await createConfiguracaoUseCase.execute(input);

    // Tenta criar novamente para a mesma empresa
    await expect(createConfiguracaoUseCase.execute(input)).rejects.toThrow(
      "Configuração para essa empresa já existe."
    );
  });
});
