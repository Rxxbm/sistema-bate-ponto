import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PontoInMemoryRepository } from "./@core/ponto/infra/ponto.repository";
import { Ponto } from "./@core/ponto/domain/ponto";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
