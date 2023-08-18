const STORAGE_APP_KEY_PREFIX = "codenames";

export const getUserName = () => {
  return sessionStorage?.getItem(`${STORAGE_APP_KEY_PREFIX}_username`);
};

export const setUserName = (name: string) => {
  return sessionStorage.setItem(`${STORAGE_APP_KEY_PREFIX}_username`, name);
};

export const getRoom = (): number | null => {
  const item = sessionStorage?.getItem(`${STORAGE_APP_KEY_PREFIX}_room`);
  return item ? +item : null;
};

export const setRoom = (roomId: number | undefined) => {
  return sessionStorage.setItem(`${STORAGE_APP_KEY_PREFIX}_room`, `${roomId}`);
};
