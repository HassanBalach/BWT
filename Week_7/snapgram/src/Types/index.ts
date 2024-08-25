import { Models } from "appwrite";

export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface SaveToDatabaseInput {
  accountID: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: URL;
}

export interface signInAccount {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}

export interface IcontextType {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export interface FileUploaderProps {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

export interface PostFormProps {
  post?: Models.Document;
  action: "Create" | "Update";
}

// 📯Post Quriesy 📮📭

export interface INewPost {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
}

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};
