import { Module } from "@nestjs/common";
import { PontoModule } from './ponto/ponto.module';
import { EmpresaModule } from "./empresa/empresa.module";
import { ConfiguracaoModule } from "./configuracoes/configuracoes.module";
import { FuncionarioModule } from "./funcionario/funcionario.module";
import { UsuarioModule } from "./usuario/usuario.module";

@Module({
  imports: [PontoModule, EmpresaModule, ConfiguracaoModule, FuncionarioModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
