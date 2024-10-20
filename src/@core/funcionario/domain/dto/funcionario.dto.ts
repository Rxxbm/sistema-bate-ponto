import { IsNotEmpty, validate, ValidationError, IsString, IsUUID } from "class-validator";

export class FuncionarioCreateDTO {
  @IsUUID(4, { message: "O ID do usuário deve ser um UUID válido." })
  @IsString({ message: "O ID do usuário deve ser uma string." })
  @IsNotEmpty({ message: "O ID do usuário não pode estar vazio." })
  usuario_id: string;

  @IsString({ message: "O cargo do funcionário deve ser uma string." })
  @IsNotEmpty({ message: "O cargo do funcionário não pode estar vazio." })
  cargo: string;

  @IsUUID(4, { message: "O ID da empresa deve ser um UUID válido." })
  @IsString({ message: "O ID da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O ID da empresa não pode estar vazio." })
  empresa_id: string;

  constructor(partial: Partial<FuncionarioCreateDTO>) {
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
