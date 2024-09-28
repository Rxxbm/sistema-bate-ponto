import { PontoDTO } from "./ponto.dto";

describe("PontoDTO", () => {
  describe("funcionario_id", () => {
    it("não deve validar um funcionario_id vazio", async () => {
      const pontoDTO = new PontoDTO({
        funcionario_id: "",
        empresa_id: "550e8400-e29b-41d4-a716-446655440002",
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID do funcionário não pode estar vazio.");
    });

    it("não deve validar um funcionario_id invalido", async () => {
      const pontoDTO = new PontoDTO({
        funcionario_id: "invalid-id",
        empresa_id: "550e8400-e29b-41d4-a716-446655440002",
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID do funcionário deve ser um UUID válido.");
    });
  });
  describe("empresa_id", () => {
    it("não deve validar um empresa_id vazio", async () => {
      const pontoDTO = new PontoDTO({
        funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
        empresa_id: "",
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID da empresa não pode estar vazio.");
    });

    it("não deve validar um empresa_id invalido", async () => {
      const pontoDTO = new PontoDTO({
        funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
        empresa_id: "invalid-id",
      });

      const errors = await pontoDTO.validate();
      expect(errors.length).not.toBeNull();
      expect(errors).toContain("O ID da empresa deve ser um UUID válido.");
    });
  });

  it("deve validar um pontoDTO válido", async () => {
    const pontoDTO = new PontoDTO({
      funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
      empresa_id: "550e8400-e29b-41d4-a716-446655440002",
    });

    const errors = await pontoDTO.validate();
    expect(errors.length).toBe(0);
  });

  it("garantir que formatErrors seja chamado", async () => {
    const pontoDTO = new PontoDTO({
      funcionario_id: "",
      empresa_id: "invalid-id",
    });

    const spy = jest.spyOn(pontoDTO as any, "formatErrors");

    await pontoDTO.validate();

    expect(spy).toHaveBeenCalled();
  });

  it("deve validar um pontoDTO válido", async () => {
    const pontoDTO = new PontoDTO({
      funcionario_id: "550e8400-e29b-41d4-a716-446655440001",
      empresa_id: "550e8400-e29b-41d4-a716-446655440002",
    });

    const errors = await pontoDTO.validate();
    expect(errors.length).toBe(0);
  });
});
