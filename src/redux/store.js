import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ticketsReducer from './slices/ticketsSlice';

const persistConfig = {
  key: 'dashboard-tickets',
  storage,
};

const persistedReducer = persistReducer(persistConfig, ticketsReducer);

export const store = configureStore({
  reducer: {
    tickets: persistedReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
