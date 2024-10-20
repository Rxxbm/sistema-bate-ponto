import { UniqueEntityUUID } from "../../@thirdparty/domain/value-objects/unique-id/unique-id";

export type FuncionarioProps = {
  id?: string;
  usuario_id: string;
  cargo: string;
  empresa_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Funcionario {
  constructor(public readonly props: FuncionarioProps) {
    this.id = props.id ?? UniqueEntityUUID.generate();
    this.usuario_id = props.usuario_id;
    this.cargo = props.cargo;
    this.empresa_id = props.empresa_id;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  get id() {
    return this.props.id;
  }

  get usuario_id() {
    return this.props.usuario_id;
  }

  get cargo() {
    return this.props.cargo;
  }

  get empresa_id() {
    return this.props.empresa_id;
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

  private set usuario_id(value: string) {
    this.props.usuario_id = value;
  }

  private set cargo(value: string) {
    this.props.cargo = value;
  }

  private set empresa_id(value: string) {
    this.props.empresa_id = value;
  }

  private set created_at(value: Date) {
    this.props.created_at = value;
  }

  private set updated_at(value: Date) {
    this.props.updated_at = value;
  }

  update(cargo: string) {
    this.cargo = cargo;
    this.updated_at = new Date();
  }
}
