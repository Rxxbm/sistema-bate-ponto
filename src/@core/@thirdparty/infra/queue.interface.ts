export interface QueueInterface {
  add(jobName: string, data: any, options?: any): Promise<void>;
  getDelayedJobs(): Promise<any[]>;
  removeJob(jobId: string): Promise<void>;
}
