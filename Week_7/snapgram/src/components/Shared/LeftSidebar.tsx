import { sidebarLinks } from "@/constants"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { useUserContext } from "@/context/AuthContext"
import Loading from "./Loading"


const LeftSidebar = () => {
    const { pathname } = useLocation()
    const {user ,  isLoading} = useUserContext();
 

    const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.preventDefault();
        // 🛑 Coming to fix this part
    }
    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className='flex gap-3 items-center'>
                    <img src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={35}
                    />
                </Link>
                {/* || !user.email */}
                {isLoading  ?(
                    <div className="h-14">
                    <Loading />
                    </div>
                ):(
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3 items-center'>
                    <img
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className='rounded-full h-8 w-8'
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3">@{user.username}</p>

                    </div>

                </Link>        
                )}


            </div>

            <ul className="flex flex-col gap-6">
                {sidebarLinks.map((index) => {
                    const isActive = pathname === index.route

                    return (
                        <li key={index.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                            <NavLink to={index.route} className="flex gap-4 items-center p-4" >
                                <img src={index.imgURL} alt={index.label} className={`group-hover:invert-white ${isActive && "invert-white"}`} />
                                {index.label}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>

            <Button
                variant="ghost"
                className="shad-button ghost flex gap-2"
                onClick={(e)=>handleSignOut(e)}
               
            >
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>




        </nav>
    )
}

export default LeftSidebar
