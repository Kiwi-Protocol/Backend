export type ApiResponse = {
  message: string;
  status: number;
  data?: any | null | undefined;
  error?: Error | null | undefined;
};
