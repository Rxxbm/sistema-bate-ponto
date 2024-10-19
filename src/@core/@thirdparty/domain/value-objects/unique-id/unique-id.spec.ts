import { UniqueEntityUUID } from "./unique-id";

describe("Testes Unitarios da Classe UniqueID", () => {
    test("deve criar um id se nenhum dado for enviado no construtor", () => {
        const id = new UniqueEntityUUID();
        expect(id).toBeInstanceOf(UniqueEntityUUID);
        expect(id.value).toBeDefined();
    });

    test("deve apresentar um erro se um id invalido for enviado no construtor", () => {
        expect(() => new UniqueEntityUUID("123")).toThrow(new Error("id invalido"));
    });

    test("deve criar um id com sucesso", () => {
        const id = new UniqueEntityUUID("123e4567-e89b-12d3-a456-426614174000");
        expect(id).toBeInstanceOf(UniqueEntityUUID);
        expect(id.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
});