export const CACHE_KEYS = {
  settings: 'pm.user.settings'
} as const;

type CacheKey = keyof typeof CACHE_KEYS;

export const useLocalStorage = () => {
  const get = async (cacheKey: CacheKey, defaultValue = '') => {
    const valueInLocalStorage = window.localStorage.getItem(CACHE_KEYS[cacheKey]);

    if (valueInLocalStorage) {
      try {
        return await JSON.parse(valueInLocalStorage);
      } catch (error) {
        console.error(`Error parsing localStorage value for ${cacheKey}:`, error);
      }
    }

    return defaultValue;
  };

  const set = async <T = string>(cacheKey: CacheKey, value: T) => {
    try {
      window.localStorage.setItem(CACHE_KEYS[cacheKey], JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage value for ${cacheKey}:`, error);
    }
  };

  const remove = async (cacheKey: CacheKey) => {
    try {
      window.localStorage.removeItem(CACHE_KEYS[cacheKey]);
    } catch (error) {
      console.error(`Error removing localStorage value for ${cacheKey}:`, error);
    }
  };

  return {
    get,
    set,
    remove
  };
};
