import { UsuarioCreateDTO } from './usuario.dto';

describe('UsuarioCreateDTO', () => {
    it('deve validar com sucesso com dados válidos', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: 'senhaSegura123',
            nome: 'Nome do Usuário',
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toHaveLength(0);
    });

    it('deve retornar erros quando o email estiver vazio', async () => {
        const dto = new UsuarioCreateDTO({
            email: '',
            senha: 'senhaSegura123',
            nome: 'Nome do Usuário',
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O email não pode estar vazio.');
    });

    it('deve retornar erros quando o email não for válido', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'emailinvalido',
            senha: 'senhaSegura123',
            nome: 'Nome do Usuário',
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O email deve ser um endereço de e-mail válido.');
    });

    it('deve retornar erros quando a senha estiver vazia', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: '',
            nome: 'Nome do Usuário',
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toContain('A senha não pode estar vazia.');
    });

    it('deve retornar erros quando o nome estiver vazio', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: 'senhaSegura123',
            nome: '',
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O nome do usuário não pode estar vazio.');
    });

    it('deve retornar erros quando o tipo_usuario estiver vazio', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: 'senhaSegura123',
            nome: 'Nome do Usuário',
            tipo_usuario: '', // Verificação do novo campo
        });
        const errors = await dto.validate();
        expect(errors).toContain('O tipo de usuário não pode estar vazio.');
    });

    it('deve retornar erros quando a senha não for uma string', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: 123 as any, // Não é uma string
            nome: 'Nome do Usuário',
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toContain('A senha deve ser uma string.');
    });

    it('deve retornar erros quando o nome não for uma string', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: 'senhaSegura123',
            nome: 123 as any, // Não é uma string
            tipo_usuario: 'Admin',
        });
        const errors = await dto.validate();
        expect(errors).toContain('O nome do usuário deve ser uma string.');
    });

    it('deve retornar erros quando o tipo_usuario não for uma string', async () => {
        const dto = new UsuarioCreateDTO({
            email: 'usuario@example.com',
            senha: 'senhaSegura123',
            nome: 'Nome do Usuário',
            tipo_usuario: 123 as any, // Não é uma string
        });
        const errors = await dto.validate();
        expect(errors).toContain('O tipo de usuário deve ser uma string.');
    });
});
