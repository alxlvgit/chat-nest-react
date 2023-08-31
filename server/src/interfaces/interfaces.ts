export interface IMessage {
  content: string;
  senderName: string;
  senderEmail: string;
  createdAt: number;
  room?: IRoom;
}

export interface IRoom {
  id: number;
  name: string;
  messages: IMessage[];
}
