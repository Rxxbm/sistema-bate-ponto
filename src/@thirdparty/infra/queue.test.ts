import BullQueue from "bull";
import { BullQueueService } from "./queue";

jest.mock("bull");

describe("BullQueueService", () => {
  let bullQueueService: BullQueueService;
  let mockQueue: jest.Mocked<BullQueue.Queue>;

  beforeEach(() => {
    mockQueue = new BullQueue("testQueue") as jest.Mocked<BullQueue.Queue>;
    (BullQueue as jest.Mock).mockImplementation(() => mockQueue);
    bullQueueService = new BullQueueService("testQueue");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve adicionar um job com sucesso", async () => {
    mockQueue.add.mockResolvedValueOnce(undefined);

    await bullQueueService.add("testJob", { data: "test" });

    expect(mockQueue.add).toHaveBeenCalledWith(
      "testJob",
      { data: "test" },
      undefined
    );

    expect(mockQueue.add).toHaveBeenCalledTimes(1);
  });

  it("deve retornar um erro ao adicionar um job", async () => {
    const error = new Error("Failed to add job");
    mockQueue.add.mockRejectedValueOnce(error);

    await expect(
      bullQueueService.add("testJob", { data: "test" })
    ).rejects.toThrow(
      "Erro ao adicionar o job testJob: Error: Failed to add job"
    );
  });

  it("deve buscar todos os jobs que estão em delay", async () => {
    const delayedJobs = [
      {
        id: "1",
        data: {},
        opts: {},
        attemptsMade: 0,
        queue: mockQueue,
      } as unknown as BullQueue.Job,
      {
        id: "2",
        data: {},
        opts: {},
        attemptsMade: 0,
        queue: mockQueue,
      } as unknown as BullQueue.Job,
    ];
    mockQueue.getDelayed.mockResolvedValueOnce(delayedJobs);

    const result = await bullQueueService.getDelayedJobs();

    expect(result).toEqual(delayedJobs);
    expect(mockQueue.getDelayed).toHaveBeenCalled();
  });

  it("deve remover um job com sucesso", async () => {
    const mockJob = { remove: jest.fn().mockResolvedValueOnce(undefined) };
    mockQueue.getJob.mockResolvedValueOnce(mockJob as any);

    await bullQueueService.removeJob("1");

    expect(mockQueue.getJob).toHaveBeenCalledWith("1");
    expect(mockJob.remove).toHaveBeenCalled();
  });

  it("deve retornar um erro quando o job não for encontrado", async () => {
    mockQueue.getJob.mockResolvedValueOnce(null);

    await expect(bullQueueService.removeJob("1")).rejects.toThrow(
      "Job 1 não encontrado"
    );

    expect(mockQueue.getJob).toHaveBeenCalledWith("1");
  });
});
