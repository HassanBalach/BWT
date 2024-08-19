import { INewPost, INewUser, signInAccount } from "@/Types";
import { ID, ImageGravity, Query } from "appwrite";
import { account, appwriteConfig, avatar, databases, storage } from "./config";

export { ID, Query } from "appwrite";

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
  accountId: string; // Matches the expected 'accountId' field in your database
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
      user
    );

    if (!createUserInDatabase) {
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
    console.log("Welcome to signInAccount");

    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    console.log({ session });

    if (!session) {
      console.log("There is some problem with in session");
    }
    return session;
  } catch (error) {
    console.log("signInTheAccountError:", error);
  }
};

export const getAccount = async () => {
  try {
    console.log("Account Object:", account);
    const currentAccount = await account.get();
    if (!currentAccount) {
      console.log("CurrentAccount got Error:", currentAccount);
    }

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

    console.log({ currentUser });

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error in getCurrentUser", error);
    return null;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFIle = await storage.createFile(
      appwriteConfig.storage,
      ID.unique(),
      file
    );
    return uploadedFIle;
  } catch (error) {
    console.log(error);
  }
};

//Getting file url form storage:



export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storage,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}



export const createPost = async (post: INewPost) => {
  try {
    //Uploading image on storage
    const uploadedFIle = await uploadFile(post.file[0]);
  console.log({uploadedFIle});


    if (!uploadedFIle) throw Error;

    const fileUrl =  getFilePreview(uploadedFIle.$id);

    
    console.log({fileUrl});
    
    

    if (!fileUrl) {
      // await deleteFile(uploadedFile.$id);
      throw Error;
    }

    //Converting tags into arrray formate

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //Create post in post db

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFIle.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      // await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
};
