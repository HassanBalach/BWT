import { z } from "zod"
import {  SignUpValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/components/Shared/Loading"

// // const { checkAuthUser, isPending: isUserLoading } = useUserContext
const {checkAuthUser,isPending: isUserLoading } = useUserContext;


console.log("useUserContext", useUserContext);



import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useUserSignInAccountMutation } from "@/lib/react-query/qreries"
import { useUserContext } from "@/context/AuthContext"




const SignUpForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  //============    Quries    ==============\\

  const { mutateAsync: createNewUser, isPending: isCreatingAccount } = useCreateUserAccountMutation()
  const { mutateAsync: signInTheAccount, isPending: isSigningInUser } = useUserSignInAccountMutation()


  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SignUpValidation>) {
    try {
      console.log("createNewUser:****", createNewUser);

      const newUser = await createNewUser(user)
      console.log("newUser:", newUser);

      if (!newUser) {
        toast({
          variant: "destructive",
          title: "Sign up failed! Please try later",
        })

        return newUser;
      }


      const session = await signInTheAccount({
        email: user.email,
        password: user.password,
      });



      if (!session) {
        console.log("There is not any avalible session:");
        
        toast({
          variant: "destructive",
          title: "Sign in failed! Please try later",
        })
        navigate("/sign-in")

        return;
      }

      // Check either User is logged in or not  {AUTH VARIFICATION}

      const isLoggedIn = await checkAuthUser();

        if(!isLoggedIn){

          console.log("isloggedIn", isLoggedIn , "Error accurs");
        }
      

      if (isLoggedIn) {
        form.reset();
        navigate("/")

      } else {
        toast({
          variant: "destructive",
          title: "Sign in failed! Please try later",
        })

        return;

      }
    } catch (error) {
      console.log({ error });
    }



  }


  return (
    <div className="sm:w-420 flex-center flex-col">
      <img src="assets/images/logo.svg" alt="Logo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        To use snapgram, Please enter your details
      </p>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4  ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">UserName</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">{isCreatingAccount || isSigningInUser || isUserLoading ? (
            <div className="flex-center gap-3  ">
              <Loading />  Loading....

            </div>
          ) : (
            "Sing Up"
          )}</Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"

            > Log in </Link>
          </p>


        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
