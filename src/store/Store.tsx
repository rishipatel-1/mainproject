import { configureStore } from '@reduxjs/toolkit';
import courseReducer from '../slice/CourseSlice';

const store = configureStore({
  reducer: {
    course: courseReducer,
  },
});

// Define RootState type based on the reducers in your store
export type RootState = ReturnType<typeof store.getState>;

export default store;
