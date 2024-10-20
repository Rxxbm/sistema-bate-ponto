import { FuncionarioCreateDTO } from './funcionario.dto';

describe('FuncionarioCreateDTO', () => {
    it('deve validar com sucesso com dados válidos', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '550e8400-e29b-41d4-a716-446655440000',
            cargo: 'Desenvolvedor',
            empresa_id: '550e8400-e29b-41d4-a716-446655440001',
        });
        const errors = await dto.validate();
        expect(errors).toHaveLength(0);
    });

    it('deve retornar erros quando o usuario_id estiver vazio', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '',
            cargo: 'Desenvolvedor',
            empresa_id: '550e8400-e29b-41d4-a716-446655440001',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O ID do usuário não pode estar vazio.');
    });

    it('deve retornar erros quando o cargo estiver vazio', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '550e8400-e29b-41d4-a716-446655440000',
            cargo: '',
            empresa_id: '550e8400-e29b-41d4-a716-446655440001',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O cargo do funcionário não pode estar vazio.');
    });

    it('deve retornar erros quando o empresa_id estiver vazio', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '550e8400-e29b-41d4-a716-446655440000',
            cargo: 'Desenvolvedor',
            empresa_id: '',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O ID da empresa não pode estar vazio.');
    });

    it('deve retornar erros quando o usuario_id não for um UUID válido', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '12345', // Não é um UUID
            cargo: 'Desenvolvedor',
            empresa_id: '550e8400-e29b-41d4-a716-446655440001',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O ID do usuário deve ser um UUID válido.');
    });

    it('deve retornar erros quando o cargo não for uma string', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '550e8400-e29b-41d4-a716-446655440000',
            cargo: 123 as any, // Não é uma string
            empresa_id: '550e8400-e29b-41d4-a716-446655440001',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O cargo do funcionário deve ser uma string.');
    });

    it('deve retornar erros quando o empresa_id não for um UUID válido', async () => {
        const dto = new FuncionarioCreateDTO({
            usuario_id: '550e8400-e29b-41d4-a716-446655440000',
            cargo: 'Desenvolvedor',
            empresa_id: '12345', // Não é um UUID
        });
        const errors = await dto.validate();
        expect(errors).toContain('O ID da empresa deve ser um UUID válido.');
    });
});
