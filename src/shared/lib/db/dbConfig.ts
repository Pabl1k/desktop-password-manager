export type CollectionKey = 'accounts' | 'bankCards' | 'notes';
type Collections = Record<CollectionKey, `collection_${CollectionKey}`>;

type DatabaseKeys = {
  NAME: string;
  COLLECTIONS: Collections;
  VERSION: number;
};

export const DB_COLLECTIONS: Collections = {
  accounts: 'collection_accounts',
  bankCards: 'collection_bankCards',
  notes: 'collection_notes'
} as const;

export const DB_KEYS: DatabaseKeys = {
  NAME: 'password-manager-database',
  COLLECTIONS: DB_COLLECTIONS,
  VERSION: 4
} as const;
