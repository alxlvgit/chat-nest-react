export interface AuthContextInterface {
  authenticated: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
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
