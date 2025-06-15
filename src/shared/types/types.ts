// TODO remove I prefix
interface InitialDBData {
  id: string;
  createdAt: number;
}

export interface IAccountCardCreate {
  sourceName: string;
  login: string;
  password: string;
  url: string;
  notes: string;
}

export type IAccountCard = IAccountCardCreate & InitialDBData;

export interface IBankCardCreate {
  title: string;
  cardNumber: string;
  cardholder: string;
  expirationDate: string;
  cvv: string;
  notes: string;
}

export type IBankCard = IBankCardCreate & InitialDBData;
