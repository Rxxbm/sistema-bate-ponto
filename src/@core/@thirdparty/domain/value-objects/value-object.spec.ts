import { ValueObject } from "./value-object";

const makeStubValueObject = (v: any) => {
    class StubValueObject extends ValueObject {}
    return new StubValueObject(v);
};

describe("Testando a Classe Abstrata de Objeto de Valor", () => {
    it("deve criar uma instancia de objeto de valor com sucesso", () => {
        let arrange = [
            { value: "value", expected: "value" },
            { value: 123, expected: "123" },
            { value: null, expected: "null" },
            { value: undefined, expected: "undefined" },
            { value: NaN, expected: "NaN" },
            { value: true, expected: "true" },
            { value: false, expected: "false" },
            { value: { a: 1 }, expected: JSON.stringify({ a: 1 }) },
            { value: [1, 2, 3], expected: JSON.stringify([1, 2, 3]) },
        ];

        arrange.forEach(a => {
            const stub = makeStubValueObject(a.value);
            expect(stub.toString()).toEqual(a.expected);
        });
    });
});