import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cryptoNewApi } from '../services/cryptoNewsApi'



export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewApi.reducerPath]: cryptoNewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewApi.middleware), // Add this line
})

setupListeners(store.dispatch)