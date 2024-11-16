
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slice/searchSlice';

const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
