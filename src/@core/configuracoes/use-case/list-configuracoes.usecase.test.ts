import { ListConfiguracoesUseCase } from './list-configuracoes.usecase';
import { ConfiguracoesInMemoryRepository, ConfiguracoesRepository } from '../infra/configuracoes.repository';
import { Configuracoes } from '../domain/configuracao';

describe('ListConfiguracoesUseCase', () => {
    let configuracoesRepository: ConfiguracoesRepository;
    let listConfiguracoesUseCase: ListConfiguracoesUseCase;

    beforeEach(() => {
        configuracoesRepository = new ConfiguracoesInMemoryRepository();
        listConfiguracoesUseCase = new ListConfiguracoesUseCase(configuracoesRepository);
    });

    it('deve retornar uma lista de configurações', async () => {
        const configuracoes: Configuracoes[] = [
            new Configuracoes({ empresa_id: '123', intervalo_max: '3h', intervalo_min: '1h', max_diaria: '8h', min_semanal: '40h' }),
            new Configuracoes({ empresa_id: '456', intervalo_max: '4h', intervalo_min: '2h', max_diaria: '6h', min_semanal: '30h' }),
        ];

        configuracoes.forEach(async configuracao => {
            await configuracoesRepository.save(configuracao);
        });

        const result = await listConfiguracoesUseCase.execute();

        expect(result).toEqual(configuracoes);
    });

    it('deve retornar uma lista vazia se nenhuma configuração for encontrada', async () => {
        const result = await listConfiguracoesUseCase.execute();

        expect(result).toEqual([]);
    });

});