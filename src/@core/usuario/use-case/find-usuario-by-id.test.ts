import { FindUsuarioByIdUseCase, Input, Output } from './find-usuario-by-id';
import { UsuarioInMemoryRepository, UsuarioRepository } from '../infra/usuario.repository';
import { Usuario } from '../domain/usuario';

describe('FindUsuarioByIdUseCase', () => {
    let useCase: FindUsuarioByIdUseCase;
    let usuarioRepository: UsuarioRepository;

    beforeEach(() => {
        usuarioRepository = new UsuarioInMemoryRepository();
        useCase = new FindUsuarioByIdUseCase(usuarioRepository);
    });

    it('deve retornar um usuário quando encontrado', async () => {
        const usuario: Usuario = new Usuario({ 
            nome: 'Lucas Pereira', 
            email: 'lucas.pereira@example.com', 
            senha: 'senha-segura', 
            tipo_usuario: 'admin' 
        }); // mock usuario object

        const input: Input = { id: usuario.id };
        await usuarioRepository.save(usuario);
        const result: Output = await useCase.execute(input);

        expect(result).toEqual(usuario);
    });

    it('deve retornar um erro quando a entidade não é encontrada', async () => {
        const input: Input = { id: 'non-existing-id' };

        await expect(useCase.execute(input)).rejects.toThrow('Entidade não encontrada com o id non-existing-id');
    });
});
