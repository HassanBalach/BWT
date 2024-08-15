import {

    useMutation,
 
   
  } from '@tanstack/react-query'
import { createNewUser, signInTheAccount } from '../appwrite/Api'
import { INewUser, signInAccount } from '@/Types'


export const useCreateUserAccountMutation =()=>{
   return useMutation({
        mutationFn: (user: INewUser )=> createNewUser(user)
    })
}

export const useUserSignInAccountMutation = ()=>{
    return useMutation({
        mutationFn: (user: signInAccount)=> signInTheAccount(user)  
    })
}