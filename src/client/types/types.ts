export interface WebsiteCardCreate {
  sourceName: string;
  login: string;
  password: string;
  url: string;
  notes: string;
}

export interface WebsiteCard extends WebsiteCardCreate {
  id: string;
  createdAt: number;
}
