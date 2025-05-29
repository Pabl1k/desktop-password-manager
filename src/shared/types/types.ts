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

export interface IBankCard {
  id: string;
  title: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  nameOnCard: string;
  notes: string;
  createdAt: number;
}
