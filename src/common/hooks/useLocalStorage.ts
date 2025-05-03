export const CACHE_KEYS = {
  settings: 'pm.user.settings'
} as const;

type CacheKey = keyof typeof CACHE_KEYS;

export const useLocalStorage = () => {
  const get = <T = unknown>(cacheKey: CacheKey, defaultValue?: T): T => {
    try {
      const valueInLocalStorage = window.localStorage.getItem(CACHE_KEYS[cacheKey]);
      if (valueInLocalStorage) {
        return JSON.parse(valueInLocalStorage) as T;
      }
    } catch (error) {
      console.error(`Error parsing localStorage value for ${cacheKey}:`, error);
    }

    return defaultValue as T;
  };

  const set = <T = unknown>(cacheKey: CacheKey, value: T) => {
    try {
      window.localStorage.setItem(CACHE_KEYS[cacheKey], JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage value for ${cacheKey}:`, error);
    }
  };

  const remove = (cacheKey: CacheKey) => {
    try {
      window.localStorage.removeItem(CACHE_KEYS[cacheKey]);
    } catch (error) {
      console.error(`Error removing localStorage value for ${cacheKey}:`, error);
    }
  };

  const update = <T = unknown>(cacheKey: CacheKey, value: T) => {
    const existingValue = get<T>(cacheKey);
    const newValue = { ...existingValue, ...value };

    set(cacheKey, newValue);
  };

  return {
    get,
    set,
    update,
    remove
  };
};
