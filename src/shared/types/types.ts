export interface InitialDBData {
  id: string;
  createdAt: number;
}

export interface AccountCreate {
  title: string;
  login: string;
  password: string;
  url: string;
  notes: string;
  safety: boolean;
}

export type AccountCardData = AccountCreate & InitialDBData;

export interface BankCardCreate {
  title: string;
  cardNumber: string;
  cardholder: string;
  expirationDate: string;
  cvv: string;
  notes: string;
  safety: boolean;
}

export type BankCardData = BankCardCreate & InitialDBData;

export interface NoteCardCreate {
  title: string;
  note: string;
  safety: boolean;
}

export type NoteCardData = NoteCardCreate & InitialDBData;

export type CombinedTypes = AccountCardData | BankCardData | NoteCardData;
