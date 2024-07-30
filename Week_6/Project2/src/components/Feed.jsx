import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Video } from ".";
import { useEffect, useState } from "react";
import { fetchFromApi } from "../../utils/FetchApi";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    // fetchFromApi(`search?part=snippet&q=${selectedCategory}`).then((data) =>
    //   setVideos(data.items)
    // );
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        console.log("Feed Fetched data:", data);
        setVideos(data.items)
      })
      .catch((error) => {
        console.error("Feed Error fetching data:", error);
      });
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" }  }}>
      <Box
        sx={{
          height: { sx: "auto", md: "90vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
          overflowY: "auto"
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © 2024 Dreamz Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        <Video Video={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
