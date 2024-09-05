import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-key": "59b9404e42mshf7eca47e3457dcbp1dec0fjsn224bee50f057",
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};
const baseUrl = import.meta.env.VITE_CRYPTO_API_URL;
console.log(`Env: ${baseUrl}`);

const createRequest = (url: string) => {
  console.log(`Creating request for: ${url}`);
  return { url, headers: cryptoApiHeaders };
};

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",

  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => {
    console.log("Building endpoints...");

    return {
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
      getCryptoDetail: builder.query({
        query: (cryptoId) => createRequest(`/coin/${cryptoId}`),
      }),
      getCryptoHistory: builder.query({
        query: ({ coinId, timePeriod }) => ({
          url: `/coin/${coinId}/history`,
          params: {
       
            timePeriod: timePeriod,
          },
          headers: cryptoApiHeaders,
        }),
      }),
      
    };
  },
});

export const { useGetCryptosQuery, useGetCryptoDetailQuery, useGetCryptoHistoryQuery } = cryptoApi;