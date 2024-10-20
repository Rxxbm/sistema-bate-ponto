import { Module } from "@nestjs/common";
import { PontoModule } from './ponto/ponto.module';
import { EmpresaModule } from "./empresa/empresa.module";
import { ConfiguracaoModule } from "./configuracoes/configuracoes.module";

@Module({
  imports: [PontoModule, EmpresaModule, ConfiguracaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
