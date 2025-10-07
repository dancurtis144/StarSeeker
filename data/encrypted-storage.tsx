import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

export enum EncryptedItemKeys {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
}

export const getEncryptedItem = async (key: EncryptedItemKeys) =>
  (await getItemAsync(key)) ?? undefined;

export const setEncryptedItem = async (key: EncryptedItemKeys, value: string) =>
  setItemAsync(key, value);

export const deleteEncryptedItem = async (key: EncryptedItemKeys) => {
  await deleteItemAsync(key);
};
