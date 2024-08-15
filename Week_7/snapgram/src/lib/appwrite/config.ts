import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const client = new Client();

export const appwriteConfig = {
  Url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storage: import.meta.env.VITE_APPWRITE_STORAGE,

  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  savedCollectionId: import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID,
};

console.log("appWrite_DB", appwriteConfig.databaseId);
console.log("appWrite_PC", appwriteConfig.postCollectionId);

client.setEndpoint(appwriteConfig.Url);
client.setProject(appwriteConfig.ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);

