

  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

  const cryptoNewHeaders = {
    'x-rapidapi-key': '6636f1e66fmshd02fd1c5deb4877p1a6e5ejsnbc9ebb08136c',
    'x-rapidapi-host': 'google-news22.p.rapidapi.com'
  }
  
  const createRequest = (url: any) => {
    console.log(`Creating request for ${url}`);
    return { url, headers: cryptoNewHeaders }
  }
  
  export const cryptoNewApi = createApi({
    reducerPath: 'cryptoNewApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CRYPTO_NEWS_API_URL }),
    endpoints: (builder) => ({
      getNewsFromApi: builder.query({
        query: ({ newsCategory, count, country, language }) => {
          try {
            console.log('Fetching news...');
            return createRequest(`/search?q=${newsCategory}&country=${country}&language=${language}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`);

          } catch (error) {
            console.error('Error in query:', error);
            throw error;
          }
        },
      }),
    }),
  })

  export const { useGetNewsFromApiQuery } = cryptoNewApi