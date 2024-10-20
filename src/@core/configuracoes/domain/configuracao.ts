import { UniqueEntityUUID } from "../../@thirdparty/domain/value-objects/unique-id/unique-id";

export type configuracoesProps = {
  id?: string;
  empresa_id: string;
  min_semanal: string;
  max_diaria: string;
  intervalo_min: string;
  intervalo_max: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Configuracoes {
  constructor(public readonly props: configuracoesProps) {
    this.id = props.id ?? UniqueEntityUUID.generate();
    this.empresa_id = props.empresa_id;
    this.min_semanal = props.min_semanal;
    this.max_diaria = props.max_diaria;
    this.intervalo_min = props.intervalo_min;
    this.intervalo_max = props.intervalo_max;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  get id() {
    return this.props.id;
  }

  get empresa_id() {
    return this.props.empresa_id;
  }

  get min_semanal() {
    return this.props.min_semanal;
  }

  get max_diaria() {
    return this.props.max_diaria;
  }

  get intervalo_min() {
    return this.props.intervalo_min;
  }

  get intervalo_max() {
    return this.props.intervalo_max;
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

  private set empresa_id(value: string) {
    this.props.empresa_id = value;
  }

  private set min_semanal(value: string) {
    this.props.min_semanal = value;
  }

  private set max_diaria(value: string) {
    this.props.max_diaria = value;
  }

  private set intervalo_min(value: string) {
    this.props.intervalo_min = value;
  }

  private set intervalo_max(value: string) {
    this.props.intervalo_max = value;
  }

  private set created_at(value: Date) {
    this.props.created_at = value;
  }

  private set updated_at(value: Date) {
    this.props.updated_at = value;
  }

  update(min_semanal: string, max_diaria: string, intervalo_min: string, intervalo_max: string) {
    this.min_semanal = min_semanal;
    this.max_diaria = max_diaria;
    this.intervalo_min = intervalo_min;
    this.intervalo_max = intervalo_max;
    this.updated_at = new Date();
  }
}
