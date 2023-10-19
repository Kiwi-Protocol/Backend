type ApiResponse<T> = {
  message: string;
  status: number;
  data?: T;
  error?: Error | null | undefined;
};

export default ApiResponse;
