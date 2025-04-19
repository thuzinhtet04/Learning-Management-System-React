export interface IUser {
  id: string;
  
  email: string;
  roleName: string;
  username: string;
  created_at: unknown;
  updated_at: unknown;
 is_available: boolean;
}

export interface IAuthUser {
  data: IUser;
  message: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export type UserAuthInput = {
  email: string;
  password: string;
  role?: 'student' | 'instructor' | 'admin';
};
