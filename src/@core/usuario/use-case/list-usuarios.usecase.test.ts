import { ListUsuariosUseCase } from './list-usuarios.usecase';
import { UsuarioInMemoryRepository } from '../infra/usuario.repository';
import { Usuario } from '../domain/usuario';

describe('ListUsuariosUseCase', () => {
    let useCase: ListUsuariosUseCase;
    let usuarioRepository: UsuarioInMemoryRepository;

    beforeEach(() => {
        usuarioRepository = new UsuarioInMemoryRepository();
        useCase = new ListUsuariosUseCase(usuarioRepository);
    });

    it('deve retornar uma lista de usuários', async () => {
        const usuario1: Usuario = new Usuario({
            nome: 'Usuario 1',
            email: 'usuario1@example.com',
            senha: 'senha123',
            tipo_usuario: 'admin',
        });

        const usuario2: Usuario = new Usuario({
            nome: 'Usuario 2',
            email: 'usuario2@example.com',
            senha: 'senha123',
            tipo_usuario: 'user',
        });

        await usuarioRepository.save(usuario1);
        await usuarioRepository.save(usuario2);

        const result = await useCase.execute();

        expect(result).toHaveLength(2);
        expect(result).toEqual(expect.arrayContaining([usuario1, usuario2]));
    });

    it('deve retornar uma lista vazia quando não houver usuários', async () => {
        const result = await useCase.execute();

        expect(result).toHaveLength(0);
    });
});
