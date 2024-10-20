import { IsNotEmpty, validate, ValidationError, IsString } from "class-validator";

export class empresaCreateDTO {
  @IsString({ message: "O nome da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O nome da empresa não deve estar vazio." })
  name: string;

  @IsString({ message: "O CNPJ da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O CNPJ da empresa não pode estar vazio." })
  cnpj: string;

  constructor(partial: Partial<empresaCreateDTO>) {
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
