import { z } from "zod"
import { SignInValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/components/Shared/Loading"

const { checkAuthUser, isLoading: isUserLoading } = useUserContext


console.log("useUserContext", useUserContext);



import { useToast } from "@/components/ui/use-toast"
import {  useUserSignInAccountMutation } from "@/lib/react-query/qreries"
import { useUserContext } from "@/context/AuthContext"




const SignInForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  //============    Quries    ==============\\

  const { mutateAsync: signInTheAccount, isPending: isSigningInUser } = useUserSignInAccountMutation()


  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SignInValidation>) {
    try {


    
      const session = await signInTheAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
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
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">    Log in to your account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        Welcome to snapgram 
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4  ">
         
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
          <Button className="shad-button_primary" type="submit">{ isSigningInUser || isUserLoading ? (
            <div className="flex-center gap-3  ">
              <Loading />  Loading....

            </div>
          ) : (
            "Sing In"
          )}</Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
           Don't have an account
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"

            > Sing up </Link>
          </p>


        </form>
      </Form>
    </div>
  )
}


export default SignInForm
