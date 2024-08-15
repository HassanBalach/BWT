import { z } from "zod"

export const SignInValidation = z.object({
    name: z.string().min(2, {"message": "Please enter a name with at least 2 characters."}),
    username: z.string().min(2, {"message": "Your username should have at least 2 characters."}),
    password: z.string().min(8, {"message": "Please ensure your password is at least 8 characters long."}),
    email: z.string().email(),
})
