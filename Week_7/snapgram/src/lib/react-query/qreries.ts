import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewUser,
  createPost,
  deletePost,
  deleteSavePost,
  getAllUser,
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  getUserById,
  getUserPosts,
  likePost,
  SavePost,
  searchPosts,
  signInTheAccount,
  signOutAccount,
  updatePost,
} from "../appwrite/Api";
import { INewPost, INewUser, IUpdatePost, signInAccount } from "@/Types";
import { QUERY_KEYS } from "./queryKey";


export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewUser(user),
  });
};

export const useUserSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: signInAccount) => signInTheAccount(user),
  });
};

export const useSignOutAccount = ()=>{
  return useMutation({
    mutationFn: signOutAccount,
  })
}








/*===============================

POST QUERIES

===============================*/

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const usegetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      SavePost(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavePost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};


export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage: any) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: null, // Set this to null or any appropriate initial value
  });
};


export const useSearchPosts = (searchTerm: string)=>{
 return useQuery({
  queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
  queryFn: ()=> searchPosts(searchTerm),
  enabled: !!searchTerm,
 })
}

export const useGetUserPost = (userId?: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS , userId],
    queryFn: ()=> getUserPosts(userId),
    enabled: !!userId,
  })
}

export const useGetPostById = (postId?: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: ()=> {
      if(postId){
        return  getPostById(postId);
      }
      return Promise.reject(new Error("Post ID is not provided"))
    },
    enabled: !!postId,
  })

}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useUpdatePost = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data)=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID , data?.$id],
      })
    }
      
  })
}




export const useGetUserById = (userId: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID , userId],
    queryFn: ()=> getUserById(userId)
  })
  

}

export const usegetAllUser = (limit?: number)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: ()=> getAllUser(limit),
  })
}

