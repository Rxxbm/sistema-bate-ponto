export interface Queue {
  add(jobName: string, data: any, options?: any): Promise<void>;
}
