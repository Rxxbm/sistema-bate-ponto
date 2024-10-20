import { Module } from "@nestjs/common";
import { PontoModule } from './ponto/ponto.module';
import { EmpresaModule } from "./empresa/empresa.module";

@Module({
  imports: [PontoModule, EmpresaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
