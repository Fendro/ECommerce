/**
 * Standardized data format which will be used to
 * send responses to clients.
 */
export type ResponseData = {
  data?: { [key: string]: any };
  dev?: { [key: string]: any };
  message: string;
  success: boolean;
};
