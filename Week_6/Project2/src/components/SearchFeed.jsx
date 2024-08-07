import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Video } from "./";
import { fetchFromApi } from "../../utils/FetchApi";
import { Fullscreen } from "@mui/icons-material";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    if (!searchTerm) {
      console.error("Search term is missing!");
      return;
    }
    console.log("Searching for:", searchTerm);

    fetchFromApi(`search?part=snippet&q=${searchTerm}`).then((data) => {
      console.log("Search Data", data);
      setVideos(data.items);
    });
  }, [searchTerm]);
  console.log("videos:", videos);
  console.log("SearchID: ",);
  
  return (
    <Box p={2} minHeight="95vh" >
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
      >
        Search Result for <span style={{ color: "#FC1503" }}>{searchTerm}</span>
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }}>{<Video Video={videos} />}</Box>
      </Box>
    </Box>
  );
};

export default SearchFeed;
