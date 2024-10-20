import { UniqueEntityUUID } from "../../@thirdparty/domain/value-objects/unique-id/unique-id";

export type UsuarioProps = {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Usuario {
  constructor(public readonly props: UsuarioProps) {
    this.id = props.id ?? UniqueEntityUUID.generate();
    this.nome = props.nome;
    this.email = props.email;
    this.senha = props.senha;
    this.tipo_usuario = props.tipo_usuario;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  get id() {
    return this.props.id;
  }

  get nome() {
    return this.props.nome;
  }

  get email() {
    return this.props.email;
  }

  get senha() {
    return this.props.senha;
  }

  get tipo_usuario() {
    return this.props.tipo_usuario;
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

  private set nome(value: string) {
    this.props.nome = value;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  private set senha(value: string) {
    this.props.senha = value;
  }

  private set tipo_usuario(value: string) {
    this.props.tipo_usuario = value;
  }

  private set created_at(value: Date) {
    this.props.created_at = value;
  }

  private set updated_at(value: Date) {
    this.props.updated_at = value;
  }

  update(nome: string, email: string, tipo_usuario: string) {
    this.nome = nome;
    this.email = email;
    this.tipo_usuario = tipo_usuario;
    this.updated_at = new Date();
  }

  // Método para atualizar a senha
  updatePassword(senha: string) {
    this.senha = senha;
    this.updated_at = new Date();
  }
}
