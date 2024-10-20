import { UniqueEntityUUID } from "../../@thirdparty/domain/value-objects/unique-id/unique-id";

export type empresaProps = {
  id?: string;
  name: string;
  cnpj: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Empresa {
  constructor(public readonly props: empresaProps) {
    this.id = props.id ?? UniqueEntityUUID.generate();
    this.name = props.name;
    this.cnpj = props.cnpj;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get created_at(): Date {
    return this.props.created_at || new Date();
  }

  get updated_at(): Date {
    return this.props.updated_at || null;
  }

  private set id(value: string) {
    const id = new UniqueEntityUUID(value);
    this.props.id = id.value;
  }


  private set name(value: string) {
    this.props.name = value;
  }

  private set cnpj(value: string) {
    this.props.cnpj = value;
  }

  private set created_at(value: Date) {
    this.props.created_at = value;
  }

  private set updated_at(value: Date) {
    this.props.updated_at = value;
  }

  update(name: string, cnpj: string) {
    this.name = name;
    this.cnpj = cnpj;
    this.updated_at = new Date();
  }
}
