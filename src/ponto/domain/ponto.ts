import { UniqueEntityUUID } from "../../@thirdparty/domain/value-objects/unique-id/unique-id";

export type pontoProps = {
  id: string;
  funcionario_id: string;
  empresa_id: string; // Novo campo para associar à empresa
  checkin?: Date;
  checkout?: Date;
};

export class Ponto {
  constructor(public readonly props: pontoProps) {
    this.id = props.id ?? UniqueEntityUUID.generate();
    this.props.funcionario_id = props.funcionario_id;
    this.props.empresa_id = props.empresa_id; // Associando a empresa
    this.checkin = props.checkin ?? new Date();
    this.checkout = props.checkout ?? null;
  }

  get id() {
    return this.props.id;
  }

  get funcionario_id() {
    return this.props.funcionario_id;
  }

  get empresa_id() {
    return this.props.empresa_id; // Getter para empresa_id
  }

  get checkin(): Date {
    return this.props.checkin || new Date();
  }

  get checkout(): Date {
    return this.props.checkout || null;
  }

  private set id(value: string) {
    const id = new UniqueEntityUUID(value);
    this.props.id = id.value;
  }

  private set checkin(value: Date) {
    if (value > new Date()) {
      throw new Error("A data de checkin não pode ser maior que a data atual");
    }
    this.props.checkin = value;
  }

  private set checkout(value: Date) {
    if (value && value < this.checkin) {
      throw new Error(
        "A data de checkout não pode ser menor que a data de checkin"
      );
    }
    this.props.checkout = value;
  }

  fechar_ponto() {
    this.props.checkout = new Date();
  }

  update(funcionario_id: string, empresa_id: string) {
    this.props.funcionario_id = funcionario_id;
    this.props.empresa_id = empresa_id;
  }
}
