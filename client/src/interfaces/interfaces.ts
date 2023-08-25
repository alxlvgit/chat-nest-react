export interface AuthContextInterface {
  authenticated: boolean;
  loginUser: (token: string, user: IUser) => void;
  logoutUser: () => void;
  user: IUser | null;
}

export interface IMessage {
  content: string;
  senderId: string;
  senderName: string;
  id: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
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
