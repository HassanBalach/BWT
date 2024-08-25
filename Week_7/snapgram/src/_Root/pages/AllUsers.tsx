import Loading from "@/components/Shared/Loading";
import UserCard from "@/components/Shared/UserCard";
import { usegetAllUser } from "@/lib/react-query/qreries"

const AllUsers = () => {
  const {data: creators , isPending: isLoading} = usegetAllUser()
  console.log({creators});
  
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
      {isLoading ? (
        <Loading />
      ):(
        <ul className="user-grid">
          {creators?.documents.map((creator)=>(
              <li key={creator.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
          ))}
        </ul>
      )}
      
      </div>
    </div>
  )
}

export default AllUsers
