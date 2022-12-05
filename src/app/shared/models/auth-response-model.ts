export interface AuthResponseModel<T> {
  exp: number;
  message: string;
  token: string;
  user: T;
}
