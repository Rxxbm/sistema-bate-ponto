import { Configuracoes, configuracoesProps } from './configuracao';

describe('Configurações', () => {
    it('deve criar uma nova instância de Configurações com valores padrão', () => {
        const props: configuracoesProps = {
            empresa_id: 'empresa-123',
            min_semanal: '40h',
            max_diaria: '8h',
            intervalo_min: '30m',
            intervalo_max: '2h',
        };
        const configuracoes = new Configuracoes(props);

        expect(configuracoes.id).toBeDefined();
        expect(configuracoes.empresa_id).toBe(props.empresa_id);
        expect(configuracoes.min_semanal).toBe(props.min_semanal);
        expect(configuracoes.max_diaria).toBe(props.max_diaria);
        expect(configuracoes.intervalo_min).toBe(props.intervalo_min);
        expect(configuracoes.intervalo_max).toBe(props.intervalo_max);
        expect(configuracoes.created_at).toBeInstanceOf(Date);
        expect(configuracoes.updated_at).toBeNull();
    });

    it('deve criar uma nova instância de Configurações com valores fornecidos', () => {
        const props: configuracoesProps = {
            empresa_id: 'empresa-123',
            min_semanal: '40h',
            max_diaria: '8h',
            intervalo_min: '30m',
            intervalo_max: '2h',
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-02'),
        };
        const configuracoes = new Configuracoes(props);

        expect(configuracoes.empresa_id).toBe(props.empresa_id);
        expect(configuracoes.min_semanal).toBe(props.min_semanal);
        expect(configuracoes.max_diaria).toBe(props.max_diaria);
        expect(configuracoes.intervalo_min).toBe(props.intervalo_min);
        expect(configuracoes.intervalo_max).toBe(props.intervalo_max);
        expect(configuracoes.created_at).toEqual(props.created_at);
        expect(configuracoes.updated_at).toEqual(props.updated_at);
    });

    it('deve atualizar a instância de Configurações', () => {
        const props: configuracoesProps = {
            empresa_id: 'empresa-123',
            min_semanal: '40h',
            max_diaria: '8h',
            intervalo_min: '30m',
            intervalo_max: '2h',
        };
        const configuracoes = new Configuracoes(props);

        configuracoes.update('35h', '7h', '25m', '1h30m');

        expect(configuracoes.min_semanal).toBe('35h');
        expect(configuracoes.max_diaria).toBe('7h');
        expect(configuracoes.intervalo_min).toBe('25m');
        expect(configuracoes.intervalo_max).toBe('1h30m');
        expect(configuracoes.updated_at).toBeInstanceOf(Date);
    });
});