import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, REHYDRATE, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
    reducer: {
        cart: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [REHYDRATE, PERSIST]
        }
      })
});

const persistor = persistStore(store);

export { store, persistor };