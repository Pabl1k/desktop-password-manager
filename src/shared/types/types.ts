export interface AccountCardCreate {
  sourceName: string;
  login: string;
  password: string;
  url: string;
  notes: string;
}

export interface AccountCard extends AccountCardCreate {
  id: string;
  createdAt: number;
}
