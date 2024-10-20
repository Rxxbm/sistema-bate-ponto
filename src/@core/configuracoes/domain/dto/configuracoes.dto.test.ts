import { configuracoesCreateDTO } from "./configuracoes.dto";

describe("configuracoesCreateDTO", () => {
    it("deve retornar os dados se os campos foram inseridos corretamente", async () => {
        const dto = new configuracoesCreateDTO({
            empresa_id: "550e8400-e29b-41d4-a716-446655440002",
            min_semanal: "40",
            max_semanal: "60",
            intervalo_min: "30",
            intervalo_max: "60",
            max_diaria: "8",
        });

        const errors = await dto.validate();
        console.log(errors);
        expect(errors).toHaveLength(0);
    });

    it("deve retornar erros se os campos estiverem vazios", async () => {
        const dto = new configuracoesCreateDTO({});

        const errors = await dto.validate();
        expect(errors).toContain("O id da empresa não pode ser vazia.");
        expect(errors).toContain("O campo de minimo semanal não pode estar vazio.");
        expect(errors).toContain("O maximo semanal da empresa não pode estar vazio.");
        expect(errors).toContain("O intervalo minimo da empresa não pode estar vazio.");
        expect(errors).toContain("O intervalo maximo da empresa não pode estar vazio.");
        expect(errors).toContain("O maximo diario da empresa não pode estar vazio.");
    });

    it("deve retornar erros para UUID inválido", async () => {
        const dto = new configuracoesCreateDTO({
            empresa_id: "invalid-uuid",
            min_semanal: "40",
            max_semanal: "60",
            intervalo_min: "30",
            intervalo_max: "60",
            max_diaria: "8",
        });

        const errors = await dto.validate();
        expect(errors).toHaveLength(1);
        expect(errors).toContain("O id da empresa deve ser um UUID válido.");
    });

    it("deve retornar erros para campos que não são strings", async () => {
        const dto = new configuracoesCreateDTO({
            empresa_id: "550e8400-e29b-41d4-a716-446655440002",
            min_semanal: 40 as any,
            max_semanal: 60 as any,
            intervalo_min: 30 as any,
            intervalo_max: 60 as any,
            max_diaria: 8 as any,
        });

        const errors = await dto.validate();
        expect(errors).toHaveLength(5);
        expect(errors).toContain("O campo de minimo semanal deve ser uma string.");
        expect(errors).toContain("O maximo semanal da empresa deve ser uma string.");
        expect(errors).toContain("O intervalo minimo da empresa deve ser uma string.");
        expect(errors).toContain("O intervalo maximo da empresa deve ser uma string.");
        expect(errors).toContain("O maximo diario da empresa deve ser uma string.");
    });
});