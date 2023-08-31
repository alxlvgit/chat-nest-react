export interface IMessage {
  content: string;
  senderName: string;
  senderEmail: string;
  createdAt: number;
  room?: IRoom;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IRoom {
  id: number;
  name: string;
  messages: IMessage[];
  participants: IUser[];
  creator: IUser;
}
