import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ChannelCard = ({channelDetail , marginTop}) => (
    <Box 
     sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '356px', md: '320px' },
     
        margin: 'auto',
        marginTop,
      }}>
        <Link to={`/channel`}>
        
        </Link>

    </Box>
)

export default ChannelCard
