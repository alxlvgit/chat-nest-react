export interface AuthContextInterface {
  authenticated: boolean;
  loginUser: (token: string, user: IUser) => void;
  logoutUser: () => void;
  user: IUser | null;
}

export interface IClientMessage {
  content: string;
  senderName: string;
  senderEmail: string;
}

export interface IStoredMessage extends IClientMessage {
  id: string;
  createdAt: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
