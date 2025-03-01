
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { INITIAL_USER, useUserContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/lib/react-query/qreries'

const Topbar = () => {
   
    const navigate = useNavigate()
    const { user, setUser, setIsAuthenticated  } = useUserContext();
    const { mutate: signOut } = useSignOutAccount()
  

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        signOut()
        setUser(INITIAL_USER)
        setIsAuthenticated(false)
        navigate("/sign-in");
    }


    return (
        <section className='topbar'>
            <div className='flex-between py-4 px-5'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img src="/assets/images/logo.svg"
                        alt=""
                        width={130}
                        height={325}
                    />

                </Link>

                <div className='flex gap-4'>
                    <Button onClick={handleSignOut}>
                        <img
                            src="/assets/icons/logout.svg"
                            alt="logout"
                        />
                    </Button>
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img
                            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className='rounded-full h-8 w-8'
                        />
                    </Link>
                </div>



            </div>

        </section>
    )
}

export default Topbar
