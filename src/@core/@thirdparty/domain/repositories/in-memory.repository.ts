import { UniqueEntityUUID } from "../value-objects/unique-id/unique-id";
import { RepositoryInterface } from "./repository.interface";

interface EntityWithId {
  id: string | UniqueEntityUUID;
}

export abstract class InMemoryRepository<E extends EntityWithId>
  implements RepositoryInterface<E>
{
  protected entities: E[] = [];

  async save(entity: E): Promise<void> {
    this.entities.push(entity);
  }

  async delete(id: string | UniqueEntityUUID): Promise<void> {
    await this._getid(id);
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }

  async update(entity: E): Promise<any> {
    await this._getid(entity.id);
    const index = this.entities.findIndex((e) => e.id === entity.id);
    this.entities[index] = entity;
  }

  async findById(id: string | UniqueEntityUUID): Promise<E> {
    const item = await this._getid(id);
    return item;
  }

  async findAll(): Promise<any[]> {
    return this.entities;
  }

  async _getid(id: string | UniqueEntityUUID): Promise<E> {
    const item = this.entities.find((entity) => entity.id === id);
    if (!item) {
      throw new Error(`Entidade não encontrada com o id ${id}`);
    }
    return item;
  }
}
