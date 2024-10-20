import { FindFuncionarioByIdUseCase, Input, Output } from './find-funcionario-by-id';
import { FuncionarioInMemoryRepository, FuncionarioRepository } from '../infra/funcionario.repository';
import { Funcionario } from '../domain/funcionario';

describe('FindFuncionarioByIdUseCase', () => {
    let useCase: FindFuncionarioByIdUseCase;
    let funcionarioRepository: FuncionarioRepository;

    beforeEach(() => {
        funcionarioRepository = new FuncionarioInMemoryRepository();
        useCase = new FindFuncionarioByIdUseCase(funcionarioRepository);
    });

    it('deve retornar um funcionário quando encontrado', async () => {
        const funcionario: Funcionario = new Funcionario({ 
            usuario_id: '1', 
            cargo: 'Desenvolvedor', 
            empresa_id: 'empresa1' 
        }); // mock funcionario object
        const input: Input = { id: funcionario.id };
        await funcionarioRepository.save(funcionario);
        const result: Output = await useCase.execute(input);

        expect(result).toEqual(funcionario);
    });

    it('deve retornar um erro quando a entidade não é encontrada', async () => {
        const input: Input = { id: '1' };

        await expect(useCase.execute(input)).rejects.toThrow('Entidade não encontrada com o id 1');
    });
});
