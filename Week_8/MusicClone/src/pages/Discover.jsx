
import { useDispatch, useSelector } from "react-redux";
import { genres } from "../assets/constants";
import Error from "../components/Error";
import Loader from "../components/Loader";
import NaatCard from "../components/NaatCard";
import { useGetAlbumsQuery } from "../redux/services/spotifyApi";


const Discover = () => {

  const {activeNaat , isPlaying} = useSelector((state)=> state.player)
  const { data, isFetching, error } = useGetAlbumsQuery("Naat and Nasheed");

  if(isFetching ) return <Loader title="Loading...." />

  if(error) return <Error />

  
  
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

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.items?.map((naat , i ) => (
          <NaatCard
            key={i} 
            naat={naat}
            isPlaying={isPlaying}
            activeNaat={activeNaat}
            data={data}
            i={i}
          />

        ))}
      </div>
    </div>
  );
};

export default Discover;