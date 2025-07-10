// TODO remove I prefix
interface InitialDBData {
  id: string;
  createdAt: number;
}

export interface AccountCreate {
  title: string;
  login: string;
  password: string;
  url: string;
  notes: string;
}
export type IAccountCard = AccountCreate & InitialDBData;

export interface IBankCardCreate {
  title: string;
  cardNumber: string;
  cardholder: string;
  expirationDate: string;
  cvv: string;
  notes: string;
}
export type IBankCard = IBankCardCreate & InitialDBData;

export interface INoteCardCreate {
  title: string;
  note: string;
}
export type INoteCard = INoteCardCreate & InitialDBData;
