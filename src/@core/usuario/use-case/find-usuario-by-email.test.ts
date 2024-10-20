import { FindUsuarioByEmailUseCase, Input, Output } from './find-usuario-by-email';
import { UsuarioInMemoryRepository, UsuarioRepository } from '../infra/usuario.repository';
import { Usuario } from '../domain/usuario';

describe('FindUsuarioByEmailUseCase', () => {
    let useCase: FindUsuarioByEmailUseCase;
    let usuarioRepository: UsuarioRepository;

    beforeEach(() => {
        usuarioRepository = new UsuarioInMemoryRepository();
        useCase = new FindUsuarioByEmailUseCase(usuarioRepository);
    });

    it('deve retornar um usuário quando encontrado', async () => {
        const usuario: Usuario = new Usuario({
            nome: 'Teste',
            email: 'teste@example.com',
            senha: 'senha123',
            tipo_usuario: 'admin',
        }); // mock usuario object

        await usuarioRepository.save(usuario);

        const input: Input = { email: 'teste@example.com' };
        const result: Output = await useCase.execute(input);

        expect(result).toEqual(usuario);
    });

    it('deve retornar um erro quando o usuário não é encontrado', async () => {
        const input: Input = { email: 'nao_existente@example.com' };

        await expect(useCase.execute(input)).rejects.toThrow('Usuário não encontrado com o email especificado');
    });
});
