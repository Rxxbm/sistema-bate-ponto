import { UniqueEntityUUID } from "../value-objects/unique-id/unique-id";

export interface RepositoryInterface<E> {
  save(entity: E): Promise<void>;
  delete(id: UniqueEntityUUID | string): Promise<void>;
  update(entity: E): Promise<E>;
  findById(id: UniqueEntityUUID | string): Promise<E>;
  findAll(): Promise<E[]>;
}
