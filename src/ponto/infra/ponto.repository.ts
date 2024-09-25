import { InMemoryRepository } from "../../@thirdparty/domain/repositories/in-memory.repository";
import { Ponto } from "../domain/ponto";

export class PontoInMemoryRepository extends InMemoryRepository<Ponto> {}
