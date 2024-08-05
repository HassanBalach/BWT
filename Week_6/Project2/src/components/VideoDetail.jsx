import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { fetchFromApi } from '../../utils/FetchApi'
import {Video , Loader} from './'
import ReactPlayer from 'react-player'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VideoDetail = () => {
  const [videoDetail , setVideoDetail] = useState(null)
  const [videos, setVideos] = useState([])
  const { id } = useParams(); // Correctly using useParams as a function


useEffect(()=>{
  if (!id) {
    console.error("ID parameter is missing!");
    return;
  }
  console.log("Fetching videos for ID:", id);

  fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
  .then((data) => {
    if (data.items && data.items.length > 0) {
      console.log("Video Details:", data.items[0]);
      setVideoDetail(data.items[0]);
    } else {
      console.error("No video data found for the given ID.");
    }
  })
  .catch((error) => {
    console.error("Error fetching video detail:", error);
  });


      

  fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data)=> {
      console.log("setVideos", data)
      setVideos(data.items)})
    .catch((error) => console.error("Error setVideo videos:", error));

  
},[id])

if(!videoDetail?.snippet) return <Loader />;

const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
   <Box minHeight="95vh">
    <Stack direction={{ xs: "column", md: "row" }}>
      
        <Box flex={1}>
            <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
           <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {title}
           </Typography>
           <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
              </Stack>
           </Stack>
            </Box>
        </Box>
      
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
        
            <Video Video={videos} direction="column" />
        </Box>

    </Stack>
   </Box>
  )
}

export default VideoDetail;
