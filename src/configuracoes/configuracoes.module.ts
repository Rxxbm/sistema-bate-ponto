import { Module } from '@nestjs/common';
import { ConfiguracaoController } from './configuracoes.controller'; 
import { ConfiguracoesInMemoryRepository, ConfiguracoesRepository } from '../@core/configuracoes/infra/configuracoes.repository'; 
import { ListConfiguracoesUseCase } from '../@core/configuracoes/use-case/list-configuracoes.usecase'; 
import { CreateConfiguracaoUseCase } from '../@core/configuracoes/use-case/create-configuracao.usecase'; 
import { FindConfiguracaoByEmpresaIdUseCase } from '../@core/configuracoes/use-case/find-configuracao-by-empresa-id';

@Module({
  controllers: [ConfiguracaoController], 
  providers: [
    {
      provide: 'ConfiguracaoRepository', 
      useClass: ConfiguracoesInMemoryRepository, 
    },
    {
      provide: ListConfiguracoesUseCase, 
      useFactory: (configuracaoRepository: ConfiguracoesRepository) => new ListConfiguracoesUseCase(configuracaoRepository),
      inject: ['ConfiguracaoRepository'], 
    },
    {
      provide: CreateConfiguracaoUseCase, 
      useFactory: (configuracaoRepository: ConfiguracoesRepository) => new CreateConfiguracaoUseCase(configuracaoRepository),
      inject: ['ConfiguracaoRepository'], 
    },
    {
      provide: FindConfiguracaoByEmpresaIdUseCase, 
      useFactory: (configuracaoRepository: ConfiguracoesRepository) => new FindConfiguracaoByEmpresaIdUseCase(configuracaoRepository),
      inject: ['ConfiguracaoRepository'], 
    },
  ],
  exports: [ListConfiguracoesUseCase, FindConfiguracaoByEmpresaIdUseCase], 
})
export class ConfiguracaoModule {}
