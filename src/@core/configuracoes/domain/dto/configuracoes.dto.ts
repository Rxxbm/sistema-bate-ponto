import { IsNotEmpty, validate, ValidationError, IsString, IsUUID } from "class-validator";

export class configuracoesCreateDTO {

  @IsUUID("4", { message: "O id da empresa deve ser um UUID válido." })
  @IsString({ message: "O id da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O id da empresa não pode ser vazia." })
  empresa_id: string;

  @IsString({ message: "O campo de minimo semanal deve ser uma string." })
  @IsNotEmpty({ message: "O campo de minimo semanal não pode estar vazio." })
  min_semanal: string;

  @IsString({ message: "O maximo semanal da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O maximo semanal da empresa não pode estar vazio." })
  max_semanal: string;

  @IsString({ message: "O intervalo minimo da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O intervalo minimo da empresa não pode estar vazio." })
  intervalo_min: string;

  @IsString({ message: "O intervalo maximo da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O intervalo maximo da empresa não pode estar vazio." })
  intervalo_max: string;

  @IsString({ message: "O maximo diario da empresa deve ser uma string." })
  @IsNotEmpty({ message: "O maximo diario da empresa não pode estar vazio." })
  max_diaria: string;

  constructor(partial: Partial<configuracoesCreateDTO>) {
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
