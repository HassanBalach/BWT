import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeNaat, naat, handlePauseClick, handlePlayClick }) => {

 
 
  const Naat = naat?.data?.albumOfTrack;

  return (
    <>
      {isPlaying && activeNaat?.name === Naat.name ? (
        <FaPauseCircle
          size={35}
          className='text-gray-300'
          onClick={handlePauseClick}
        />
      ) : (
        <FaPlayCircle
          size={35}
          className='text-gray-300'
          onClick={handlePlayClick}
        />
      )}
    </>
  );
};

export default PlayPause;