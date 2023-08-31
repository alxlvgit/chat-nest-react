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
  room: IStoredRoom | undefined;
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

export interface IStoredRoom {
  id: number;
  name: string;
  messages: IStoredMessage[];
  participants: IUser[];
  creator: IUser;
  isCreator: boolean;
  isMember: boolean;
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
