import localforage from 'localforage';

/**
 * 获取本地User
 */
export const getUser = async (): Promise<string | null> => {
  return await localforage.getItem('user');
};

/**
 * 设置存储本地User
 */
export const setUser = async (data: string): Promise<boolean> => {
  try {
    await localforage.setItem('user', data);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 移除本地User
 */
export const removeUser = async (): Promise<boolean> => {
  try {
    await localforage.removeItem('user');
    return true;
  } catch (error) {
    return false;
  }
};
