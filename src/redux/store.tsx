import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './auth.slice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
