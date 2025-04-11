import { useEffect, useState } from 'react';
import { uniqueId } from '../common/utils';
import { WebsiteCard, WebsiteCardCreate } from '../types/types';
import { DB_KEYS } from './keys';

export const useDatabase = <T extends WebsiteCard>() => {
  const [state, setState] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(DB_KEYS.NAME, DB_KEYS.VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(DB_KEYS.STORE_NAME)) {
          db.createObjectStore(DB_KEYS.STORE_NAME, { keyPath: 'id', autoIncrement: true });
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
      const transaction = db.transaction(DB_KEYS.STORE_NAME, 'readonly');
      const store = transaction.objectStore(DB_KEYS.STORE_NAME);

      const data = await new Promise<T[]>((resolve, reject) => {
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result as T[]);
        request.onerror = () => reject(request.error);
      });

      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setState(sortedData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const add = async <D = WebsiteCardCreate>(item: D) => {
    setLoading(true);

    try {
      const db = await openDB();
      const transaction = db.transaction(DB_KEYS.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DB_KEYS.STORE_NAME);

      await new Promise((resolve, reject) => {
        const dbItem = { ...item, id: uniqueId(), createdAt: Date.now() };
        const request = store.add(dbItem);

        request.onsuccess = () => resolve(loadData());
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);

    try {
      const db = await openDB();
      const transaction = db.transaction(DB_KEYS.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DB_KEYS.STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve(loadData());
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { state, loading, add, remove };
};
