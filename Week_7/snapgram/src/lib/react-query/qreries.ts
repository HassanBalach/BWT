import {  useMutation } from "@tanstack/react-query";
import { createNewUser, createPost, signInTheAccount } from "../appwrite/Api";
import { INewPost, INewUser, signInAccount } from "@/Types";

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

export const useCreatePostMutation = () => {
  //  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    
    //🟨 WelCome soon After get posts💥

    //  onSuccess: ()=>{
    //    queryClient.invalidateQueries({
    //      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    //    })
    //  }
  });
};
