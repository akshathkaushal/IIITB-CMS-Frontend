export interface LoginResponse {
  token: string;
  email : string;
  expiresAt: Date;
  rollNo: string;
  role : string;
  name : string;
}
