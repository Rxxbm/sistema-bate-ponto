export type pontoProps = {
  id: string;
  funcionario_id: string;
  checkin?: Date;
  checkout?: Date;
};

export class Ponto {
  constructor(public readonly props: pontoProps) {
    this.props.id = props.id;
    this.props.funcionario_id = props.funcionario_id;
    this.checkin = props.checkin ?? new Date();
    this.checkout = props.checkout ?? null;
  }

  get id() {
    return this.props.id;
  }

  get funcionario_id() {
    return this.props.funcionario_id;
  }

  get checkin(): Date {
    return this.props.checkin || new Date();
  }

  private set checkin(value: Date) {
    if (value > new Date()) {
      throw new Error("A data de checkin não pode ser maior que a data atual");
    }
    this.props.checkin = value;
  }

  private set checkout(value: Date) {
    if (value < this.checkin) {
      throw new Error(
        "A data de checkout não pode ser menor que a data de checkin"
      );
    }
    this.props.checkout = value;
  }

  fechar_ponto() {
    this.props.checkout = new Date();
  }
}
