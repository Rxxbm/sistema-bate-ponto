import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsDate,
  validate,
} from "class-validator";

export class PontoDTO {
  @IsUUID("4", { message: "O ID deve ser um UUID válido." })
  @IsNotEmpty({ message: "O ID não pode estar vazio." })
  id: string;

  @IsUUID("4", { message: "O ID do funcionário deve ser um UUID válido." })
  @IsNotEmpty({ message: "O ID do funcionário não pode estar vazio." })
  funcionario_id: string;

  @IsUUID("4", { message: "O ID da empresa deve ser um UUID válido." })
  @IsNotEmpty({ message: "O ID da empresa não pode estar vazio." })
  empresa_id: string;

  @IsOptional()
  @IsDate({ message: "A data de checkin deve ser uma data válida." })
  checkin?: Date;

  @IsOptional()
  @IsDate({ message: "A data de checkout deve ser uma data válida." })
  checkout?: Date;

  constructor(partial: Partial<PontoDTO>) {
    Object.assign(this, partial);
  }

  async validate() {
    return validate(this);
  }
}
