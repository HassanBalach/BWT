import { Stack, Box } from "@mui/material";
import React from "react";
import { ChannelCard, Loader, VideoCard } from "./";


const Video = ({ Video, direction }) => {
 console.log("Video", Video);
  if (!Video?.length) return <Loader />;
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {Video.map((item, index) => (
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.videoId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Video;
