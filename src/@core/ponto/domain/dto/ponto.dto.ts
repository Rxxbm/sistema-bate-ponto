import { IsUUID, IsNotEmpty, validate, ValidationError } from "class-validator";

export class PontoDTO {
  @IsUUID("4", { message: "O ID do funcionário deve ser um UUID válido." })
  @IsNotEmpty({ message: "O ID do funcionário não pode estar vazio." })
  funcionario_id: string;

  @IsUUID("4", { message: "O ID da empresa deve ser um UUID válido." })
  @IsNotEmpty({ message: "O ID da empresa não pode estar vazio." })
  empresa_id: string;

  constructor(partial: Partial<PontoDTO>) {
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
      })
      .flat();
  }
}
