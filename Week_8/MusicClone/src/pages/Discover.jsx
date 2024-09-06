import { genres } from "../assets/constants";
import { useGetAlbumsQuery } from "../redux/services/spotifyApi";

const Discover = () => {
  
 const {data , isFetching,  error} = useGetAlbumsQuery('3IBcauSj5M2A6lTeffJzdv')

 if (isFetching) {
  return (
    <p>Loading</p>
  )
}else if(error){
  return <p>{error}</p>
} else {
  console.log({ data });
  // Render the data object here
}
    



 


  const genreTitle = "Pop";
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8"></div>
   
   
      </div>
  );
};

export default Discover;
