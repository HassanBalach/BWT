export interface INewUser{
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
    password: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  }

  export interface IcontextType {
    user: IUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    checkAuthUser: () => Promise<boolean>;
}