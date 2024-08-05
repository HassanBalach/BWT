import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {ChannelCard, Video} from './';
import { fetchFromApi } from '../../utils/FetchApi';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null)
  const { id } = useParams();
  
  useEffect(()=>{
    const fetchResult = async()=>{

      const data = await fetchFromApi(`search?channelId=${id}&part=snippet%2Cid&order=date`)
      console.log("Data in ChannelDetail", data);
      setChannelDetail(data?.items[0])

      const videosData = await fetchFromApi(`search?channelId=${id}&part=snippet%2Cid&order=date`)
      
      setVideos(videosData?.items)
    
    }
    fetchResult()

  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />

        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Video Video={videos}/>
  
        
      </Box>
    </Box>
  )
}

export default ChannelDetail
    