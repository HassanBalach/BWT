import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: 20,
  },
  headers: {
    "x-rapidapi-key": "59b9404e42mshf7eca47e3457dcbp1dec0fjsn224bee50f057",
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};
export const fetchFromApi = async (url ) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log("Data in fetchFromApi", data);
    return data;
  } catch (error) {
    
    console.error("Error fetching data from API:", error);
    throw error;
  }
};
