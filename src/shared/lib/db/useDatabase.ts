import { useEffect, useState } from 'react';
import { CombinedTypes } from '../../types/types';
import { type CollectionKey, DB_COLLECTIONS, DB_KEYS } from './dbConfig';

type StateType = Record<CollectionKey, CombinedTypes[]>;

const COLLECTION_KEYS = Object.keys(DB_COLLECTIONS) as CollectionKey[];
const COLLECTION_NAMES = Object.values(DB_COLLECTIONS);

const initialState: StateType = {
  accounts: [],
  bankCards: [],
  notes: []
};

export const useDatabase = () => {
  const [state, setState] = useState<StateType>(initialState);
  const [loading, setLoading] = useState(false);

  const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(DB_KEYS.NAME, DB_KEYS.VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        for (const collectionName of COLLECTION_KEYS) {
          if (!db.objectStoreNames.contains(DB_COLLECTIONS[collectionName])) {
            db.createObjectStore(DB_COLLECTIONS[collectionName], {
              keyPath: 'id',
              autoIncrement: true
            });
          }
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.error('Failed opening database', request.error);
        reject(request.error);
      };
    });

  const loadData = async () => {
    setLoading(true);

    try {
      const db = await openDB();
      const transaction = db.transaction(COLLECTION_NAMES, 'readonly');

      for (const collectionName of COLLECTION_KEYS) {
        await new Promise<void>((resolve, reject) => {
          const store = transaction.objectStore(DB_COLLECTIONS[collectionName]);
          const request = store.getAll();

          request.onsuccess = () => {
            const data = request.result as CombinedTypes[];

            setState((prev) => ({
              ...prev,
              [collectionName]: data
            }));

            resolve();
          };

          request.onerror = () => reject(request.error);
        });
      }
    } catch (error) {
      console.error('Error fetching data from collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const add = async <T>(collection: CollectionKey, data: T) => {
    setLoading(true);

    try {
      const db = await openDB();
      const transaction = db.transaction(DB_COLLECTIONS[collection], 'readwrite');
      const store = transaction.objectStore(DB_COLLECTIONS[collection]);

      await new Promise<void>((resolve, reject) => {
        const dbItem = {
          ...data,
          createdAt: Date.now()
        };

        const request = store.add(dbItem);

        request.onsuccess = () => {
          loadData();
          resolve();
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      console.error(`Error adding item to ${collection}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // const add = async(collection: string, data: any) => {
  //   setLoading(true);
  //
  //   try {
  //     const db = await openDB();
  //     const transaction = db.transaction(DB_KEYS.STORE_NAME, 'readwrite');
  //     const store = transaction.objectStore(DB_KEYS.STORE_NAME);
  //
  //     await new Promise((resolve, reject) => {
  //       const dbItem = { ...item, id: uniqueId(), createdAt: Date.now() };
  //       const request = store.add(dbItem);
  //
  //       request.onsuccess = () => resolve(loadData());
  //       request.onerror = () => reject(request.error);
  //     });
  //   } catch (error) {
  //     console.error('Error adding item:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //
  // const remove = async (id: string) => {
  //   setLoading(true);
  //
  //   try {
  //     const db = await openDB();
  //     const transaction = db.transaction(DB_KEYS.STORE_NAME, 'readwrite');
  //     const store = transaction.objectStore(DB_KEYS.STORE_NAME);
  //
  //     await new Promise<void>((resolve, reject) => {
  //       const request = store.delete(id);
  //       request.onsuccess = () => resolve(loadData());
  //       request.onerror = () => reject(request.error);
  //     });
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    loadData();
  }, []);

  return { state, loading, add }; //  remove
};
