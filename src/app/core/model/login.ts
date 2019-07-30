export interface LoginModel {
  username: string;
  password: string;
  userType: number;
}

export interface LeadModel {
  mobile: string;
  details: string;
}

export interface OAuthToken {
  token: string;
}

export interface UserDetail {
  name: string;
  email: string;
  id: string;
  userType: string;
  refreshToken: string;
}
