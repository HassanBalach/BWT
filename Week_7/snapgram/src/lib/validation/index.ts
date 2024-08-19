import { z } from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, {"message": "Please enter a name with at least 2 characters."}),
    username: z.string().min(2, {"message": "Your username should have at least 2 characters."}),
    password: z.string().min(8, {"message": "Please ensure your password is at least 8 characters long."}),
    email: z.string().email(),
})


export const SignInValidation = z.object({
   
    email: z.string().email(),
    password: z.string().min(8, {"message": "Please ensure your password is at least 8 characters long."}),
})


export const PostValidation = z.object({
   caption: z.string().min(5 ,{message: "Minium 5 character."}),
   file: z.custom<File[]>(),
   location: z.string().min(1 , {message: "This field is required"}),
   tags: z.string()
})
