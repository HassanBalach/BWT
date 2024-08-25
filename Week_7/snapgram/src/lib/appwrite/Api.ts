import { INewPost, INewUser, IUpdatePost, signInAccount } from "@/Types";
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

export const signOutAccount = async()=>{
  try {
    const session  =  await account.deleteSession("current")
    return session;
  } catch (error) {
    console.log(error);
    
  }
}

export const getAccount = async () => {
  try {
    // console.log("Account Object:", account);
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

    // console.log({ currentUser });

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

    if (!uploadedFIle) throw Error;

    const fileUrl = getFilePreview(uploadedFIle.$id);

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

export const getRecentPosts = async () => {
  // Get post from db and cache them in react query:
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
};

// export const deletePost= async(postId?: string , imageId?: string){

// }

export const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatePost) throw Error;

    return updatePost;
  } catch (error) {
    console.log(error);
  }
};
export const SavePost = async (userId: string, postId: string) => {
  try {
    const updatePost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatePost) throw Error;

    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavePost = async (savedRecodeId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      savedRecodeId
    );

    if (!statusCode) throw Error;

    return statusCode;
  } catch (error) {
    console.log(error);
  }
};

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam?: string;
}) => {
  // console.log("GETINFINITEPOST___");
  // console.log("PageParam:", pageParam);

  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  // Push the cursorAfter query if pageParam is defined
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam));
  }

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!post || post === undefined) throw new Error("No posts found");

    return post;
  } catch (error) {
    console.log("Error in getInfinitePosts:", error);
    throw error; // Re-throw the error to be caught by useInfiniteQuery's onError
  }
};

export const searchPosts = async (searchTerm: string) => {
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );
    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (userId?: string) => {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAT")]
    );
    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: string) => {
  if (!postId) throw Error;
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!post) throw Error;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storage, fileId);

    return { status: "OK" };
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId?: string, imageId?: string) => {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "OK" };
  } catch (error) {
    console.log(error);
  }
};

export const uploadingFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storage,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.error("Error uploading file:", error);
    return undefined; // Explicitly return undefined on error
  }
};

export const updatePost = async (post: IUpdatePost) => {
  const hasFileToUpdate = post.file.length > 0;

  console.log({ hasFileToUpdate });

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      // Get new file URL
      const updatedFile = await uploadingFile(post.file[0]);

      if (!updatedFile) {
        throw new Error("File upload failed.");
      }

      const fileUrl = await getFilePreview(updatedFile.$id);

      if (!fileUrl) {
        await deleteFile(updatedFile.$id);
        throw new Error("Failed to get file preview URL.");
      }

      image = { ...image, imageUrl: fileUrl, imageId: updatedFile.$id };
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw new Error("Failed to update post.");
    }

    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userid: string) => {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userid
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (limit?: number) => {
  const queries: any[] = [Query.orderDesc("$createdAT")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );
    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
};
