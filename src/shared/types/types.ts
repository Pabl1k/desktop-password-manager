export interface IAccountCardCreate {
  sourceName: string;
  login: string;
  password: string;
  url: string;
  notes: string;
}

export interface IAccountCard extends IAccountCardCreate {
  id: string;
  createdAt: number;
}
