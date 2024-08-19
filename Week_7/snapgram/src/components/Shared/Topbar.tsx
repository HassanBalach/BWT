
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
    const { user } = useUserContext();




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
                    <Button>
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
