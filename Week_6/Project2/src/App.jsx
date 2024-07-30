import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Feed, VideoDetail, ChannelDetail, SearchFeed, Navbar } from "./components";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box sx={{backgroundColor: '#000'}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
    </Box>
  );
};

export default App;
