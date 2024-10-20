import { empresaCreateDTO } from './empresa.dto';

describe('empresaCreateDTO', () => {
    it('deve validar com sucesso com dados válidos', async () => {
        const dto = new empresaCreateDTO({ name: 'Empresa Teste', cnpj: '12345678901234' });
        const errors = await dto.validate();
        expect(errors).toHaveLength(0);
    });

    it('deve retornar erros quando o name estiver vazio', async () => {
        const dto = new empresaCreateDTO({ name: '', cnpj: '12345678901234' });
        const errors = await dto.validate();
        expect(errors).toContain('O nome da empresa não deve estar vazio.');
    });

    it('deve retornar erros quando o cnpj estiver vazio', async () => {
        const dto = new empresaCreateDTO({ name: 'Empresa Teste', cnpj: '' });
        const errors = await dto.validate();
        expect(errors).toContain('O CNPJ da empresa não pode estar vazio.');
    });

    it('deve retornar erros quando o name não for uma string', async () => {
        const dto = new empresaCreateDTO({ name: 123 as any, cnpj: '12345678901234' });
        const errors = await dto.validate();
        expect(errors).toContain('O nome da empresa deve ser uma string.');
    });

    it('deve retornar erros quando o cnpj não for uma string', async () => {
        const dto = new empresaCreateDTO({ name: 'Empresa Teste', cnpj: 123 as any });
        const errors = await dto.validate();
        expect(errors).toContain('O CNPJ da empresa deve ser uma string.');
    });
});