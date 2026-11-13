export function responseHandler(success: boolean, message: string, data?: any) {
  return {
    success,
    message,
    data,
  };
}
