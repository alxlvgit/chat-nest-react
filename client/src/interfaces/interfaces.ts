export interface AuthContextInterface {
  authenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface IMessage {
  content: string;
  senderId: string;
  id: string;
}
