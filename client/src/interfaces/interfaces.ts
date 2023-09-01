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
  room: IRoom | undefined;
}

export interface IStoredMessage extends IClientMessage {
  id: string;
  createdAt: number;
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

export interface IRoom {
  id: number;
  name: string;
  isMember: boolean;
}

export interface IStoredRoom extends IRoom {
  messages: IStoredMessage[];
  participants: IUser[];
}

export interface ICreateRoomRequest {
  name: string;
}

export interface IDeleteRoomRequest {
  id: string;
}

export interface IUpdateRoomRequest {
  id: string;
  name: string;
}
