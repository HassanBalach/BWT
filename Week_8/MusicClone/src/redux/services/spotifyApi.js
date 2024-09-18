import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
      baseUrl: 'https://spotify23.p.rapidapi.com',
      prepareHeaders: (headers) => {
          headers.set('x-rapidapi-key', import.meta.env.VITE_SPOTIFY_RAPID_API_KEY);
          return headers;
      },
  }),
  endpoints: (builder) => ({
      getAlbums: builder.query({
        query: (id) => ({
            url: `/search/`,
            params: {
             q: id, // Pass the ID as a parameter
            },
          }),
      }),
  }),
});

export const { useGetAlbumsQuery } = spotifyApi;
