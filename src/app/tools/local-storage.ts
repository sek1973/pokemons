export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('writing data to browser local storage failed: ', e);
  }
}

export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch (e) {
    console.error('pulling data from browser local storage failed: ', e);
    return null;
  }
}
