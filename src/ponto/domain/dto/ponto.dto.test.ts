import { PontoDTO } from "./ponto.dto";

describe("PontoDTO", () => {
  describe("ID", () => {
    it("não deve validar um id vazio", async () => {
      const pontoDTO = new PontoDTO({
        id: "",
        funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
        empresa_id: "550e8400-e29b-41d4-a716-446655440002",
        checkin: new Date(),
        checkout: new Date(),
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).toBe(1);
      expect(errors[0].constraints.isNotEmpty).toBe(
        "O ID não pode estar vazio."
      );
    });

    it("não deve validar um id invalido", async () => {
      const pontoDTO = new PontoDTO({
        id: "invalid-id",
        funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
        empresa_id: "550e8400-e29b-41d4-a716-446655440002",
        checkin: new Date(),
        checkout: new Date(),
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).toBe(1);
      expect(errors[0].constraints.isUUID).toBe(
        "O ID deve ser um UUID válido."
      );
    });
  });
});
