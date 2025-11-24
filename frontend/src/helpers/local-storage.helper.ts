export function saveToLocalStorage<T>(data: T, key: string) {
  const dataToSave = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(dataToSave));
}

// new function to get posts from localstorage if cache time is not expired
export function getFromLocalStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (data) {
    const parsedData = JSON.parse(data);
    const currentTime = new Date().getTime();
    const cacheTime = 1000 * 60 * 10; // 10 minutes

    if (currentTime - parsedData.timestamp < cacheTime) {
      return parsedData;
    } else {
      localStorage.removeItem(key);
    }
  }
  return null;
}
