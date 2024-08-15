
 import { getCurrentUser } from "@/lib/appwrite/Api";
import { IcontextType, IUser } from "@/Types";
import  React, { useContext , createContext, useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";





/*
    How initial user looks like ✅
    How initial state of user look like 
*/ 

export const INITIAL_USER = {
    id: " ",
    name: " ",
    password: " ",
    username: " ",
    email: " ",
    imageUrl: " ",
    bio: " ", 
}

export const INITIAL_STATE = {

    user: INITIAL_USER,
    isLoading: false ,
    isAuthenticated: false,
    setUser: ()=> {},
    setIsAuthenticated: ()=>{},
    checkAuthUser: async ()=> false as boolean

}


const AuthContext = createContext<IcontextType>(INITIAL_STATE)

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user , setUser] = useState<IUser>(INITIAL_USER)
    const [isAuthenticated, setIsAuthenticated]= useState(false)
    const [isLoading, setIsLoading]= useState(false)
    const navigate = useNavigate()
    
    const checkAuthUser = async ()=>{
        setIsLoading(true)
        try {
          const currentAccount =   await getCurrentUser() //💥Need to start the journey from here 
          console.log("CurrentAccount ", currentAccount);
          
          if(currentAccount){
            setUser({
                id: currentAccount.$id,
                name: currentAccount.name,
                password: currentAccount.password,
                username:  currentAccount.username,
                email:  currentAccount.emial,
                imageUrl:  currentAccount.imageUrl,
                bio: currentAccount.bio
            })
            setIsAuthenticated(true);
            return true;


          }
          return false;
        } catch (error) {
            console.error("Error in CheckAuthUser",error);
            return false;
        }finally{
            setIsLoading(false)
        }
    }
    
    useEffect(()=>{
        const validAuthToken = localStorage.getItem("cookieFallback")
        // || validAuthToken === null || validAuthToken === undefined
        if(validAuthToken === "[]" ){
            navigate("/sign-in")
        }

        checkAuthUser();

    },[])


    const value = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    }



    return(
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
  
}

export const useUserContext = ()=> useContext(AuthContext)
