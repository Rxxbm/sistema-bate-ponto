import { v4 as uuidv4, validate as uuidValidate} from "uuid";
import { ValueObject } from "../value-object";

export class UniqueEntityUUID extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id ?? UniqueEntityUUID.generate());
    this.validate(id ?? this.value);
  }

  static generate(): string {
    const id = uuidv4();
    return id;
  }

  private validate(id: string){
    const isValid = uuidValidate(id);
    if(!isValid){
      throw new Error("id invalido");
    }
  }
}