import { IsNotEmpty, validate, ValidationError, IsString, IsEmail, IsUUID } from "class-validator";

export class UsuarioCreateDTO {
  @IsEmail({}, { message: "O email deve ser um endereço de e-mail válido." })
  @IsNotEmpty({ message: "O email não pode estar vazio." })
  email: string;

  @IsString({ message: "A senha deve ser uma string." })
  @IsNotEmpty({ message: "A senha não pode estar vazia." })
  senha: string;

  @IsString({ message: "O nome do usuário deve ser uma string." })
  @IsNotEmpty({ message: "O nome do usuário não pode estar vazio." })
  nome: string;

  @IsString({ message: "O tipo de usuário deve ser uma string." })
  @IsNotEmpty({ message: "O tipo de usuário não pode estar vazio." })
  tipo_usuario: string; // Alterado de "matricula" para "tipo_usuario"

  constructor(partial: Partial<UsuarioCreateDTO>) {
    Object.assign(this, partial);
  }

  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      return this.formatErrors(errors);
    }
    return [];
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors
      .map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints);
        }
        return []; // Para evitar undefined em caso de não haver constraints
      })
      .flat();
  }
}
