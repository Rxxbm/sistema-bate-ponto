import { findEmpresaByIdUseCase, Input, Output } from './find-empresa-by-id';
import { EmpresaInMemoryRepository, EmpresaRepository } from '../infra/empresa.repository';
import { Empresa } from '../domain/empresa';

describe('findEmpresaByIdUseCase', () => {
    let useCase: findEmpresaByIdUseCase;
    let empresaRepository: EmpresaRepository;

    beforeEach(() => {
        empresaRepository = new EmpresaInMemoryRepository();
        useCase = new findEmpresaByIdUseCase(empresaRepository);
    });

    it('deve retornar uma empresa quando encontrada', async () => {
        const empresa: Empresa = new Empresa({ cnpj: '1', name: 'Empresa Teste' }); // mock empresa object
        const input: Input = { id: empresa.id };
        await empresaRepository.save(empresa);
        const result: Output = await useCase.execute(input);

        expect(result).toEqual(empresa);
    });

    it('deve retornar um erro quando a entidade não é encontrada', async () => {
        const input: Input = { id: '1' };

        await expect(useCase.execute(input)).rejects.toThrow('Entidade não encontrada com o id 1');
    });
});