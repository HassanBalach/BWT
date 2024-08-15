import { INewUser , signInAccount } from "@/Types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatar, databases } from "./config";


export { ID , Query} from "appwrite";

// Sign-up controllers

export const createNewUser = async (user: INewUser) => {
  try {
    // console.log("User Data:", user);
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newUser) throw Error;

    const avatarUrl = avatar.getInitials(user.name);

    const createUser = await saveToDatabase({
      accountId: newUser.$id,
      name: newUser.name,
      email: newUser.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return createUser;
  } catch (error) {
    console.log("Error:", error);
    console.log({ message: "Sometime went wrong with createNewUser " });
  }
};

export const saveToDatabase = async (user: {
  accountId: string;  // Matches the expected 'accountId' field in your database
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) => {
  try {
   
    const createUserInDatabase = await databases.createDocument(  
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    );

    if(!createUserInDatabase){
      console.log("SomeThing got wrong while creating user in db");
      
    }

    if (createUserInDatabase) {
      console.log(`User is successfully created in Database`);
    }
    return createUserInDatabase;
  } catch (error) {
    console.log("Error in saveToDatabase:", error);
  }
};

export const signInTheAccount = async (user: signInAccount) => {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log("signInTheAccountError:", error);
  }
};

export const getAccount = async () => {
  try {
    console.log("Account Object:", account);
    const currentAccount = await account.get()

   console.log("CurrentAccount got Error:", currentAccount)


    return currentAccount;
  } catch (error) {
    console.log("Error getAccount", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) return null;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || !currentUser.documents.length) return null;

    return currentUser.documents[0]


  } catch (error) {
    console.log("Error in getCurrentUser", error);
    return null;
  }
};
