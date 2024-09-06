import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apikey = import.meta.env.VITE_SPOTIFY_RAPID_API_KEY;
console.log({apikey});


export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://spotify23.p.rapidapi.com',
     prepareHeaders: (headers)=>{
        headers.set('x-rapidapi-key', apikey);     
        return headers;
    }
    }),

    endpoints: (builder) => ({
    getAlbums: builder.query({
        query: (ids) => ({
            url: `/albums`,
            params: { ids }
          })
    })
  }),
})



export const { useGetAlbumsQuery } = spotifyApi