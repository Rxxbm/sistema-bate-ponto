import BullQueue, { Queue } from "bull";
import { QueueInterface } from "./queue.interface";

export class BullQueueService implements QueueInterface {
  private queue: Queue;

  constructor(queueName: string) {
    this.queue = new BullQueue(queueName);
  }

  async add(jobName: string, data: any, options?: any): Promise<void> {
    try {
      await this.queue.add(jobName, data, options);
    } catch (error) {
      throw new Error(`Erro ao adicionar o job ${jobName}: ${error}`);
    }
  }

  async getDelayedJobs(): Promise<any[]> {
    return await this.queue.getDelayed();
  }

  async removeJob(jobId: string): Promise<void> {
    const job = await this.queue.getJob(jobId);
    if (job) {
      await job.remove();
    } else {
      throw new Error(`Job ${jobId} não encontrado`);
    }
  }
}
