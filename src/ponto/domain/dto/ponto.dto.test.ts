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
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID não pode estar vazio.");
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
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID deve ser um UUID válido.");
    });
  });
  describe("funcionario_id", () => {
    it("não deve validar um funcionario_id vazio", async () => {
      const pontoDTO = new PontoDTO({
        id: "550e8400-e29b-41d4-a716-446655440000",
        funcionario_id: "",
        empresa_id: "550e8400-e29b-41d4-a716-446655440002",
        checkin: new Date(),
        checkout: new Date(),
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID do funcionário não pode estar vazio.");
    });

    it("não deve validar um funcionario_id invalido", async () => {
      const pontoDTO = new PontoDTO({
        id: "550e8400-e29b-41d4-a716-446655440000",
        funcionario_id: "invalid-id",
        empresa_id: "550e8400-e29b-41d4-a716-446655440002",
        checkin: new Date(),
        checkout: new Date(),
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID do funcionário deve ser um UUID válido.");
    });
  });
  describe("empresa_id", () => {
    it("não deve validar um empresa_id vazio", async () => {
      const pontoDTO = new PontoDTO({
        id: "550e8400-e29b-41d4-a716-446655440000",
        funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
        empresa_id: "",
        checkin: new Date(),
        checkout: new Date(),
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID da empresa não pode estar vazio.");
    });

    it("não deve validar um empresa_id invalido", async () => {
      const pontoDTO = new PontoDTO({
        id: "550e8400-e29b-41d4-a716-446655440000",
        funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
        empresa_id: "invalid-id",
        checkin: new Date(),
        checkout: new Date(),
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID da empresa deve ser um UUID válido.");
    });
  });
});
