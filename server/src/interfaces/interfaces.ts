export interface IMessage {
  content: string;
  senderName: string;
  senderEmail: string;
  createdAt: Date;
  room?: IRoom;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IRoom {
  id: number;
  name: string;
  isMember: boolean;
}

export interface IStoredRoom extends IRoom {
  messages: IMessage[];
  participants: IUser[];
  creatorId: number;
}
