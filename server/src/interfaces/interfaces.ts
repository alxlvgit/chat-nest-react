export interface IMessage {
  content: string;
  senderName: string;
  senderEmail: string;
  createdAt: string;
  room?: IRoom;
}

export interface IRoom {
  id: number;
  name: string;
  messages: IMessage[];
}
