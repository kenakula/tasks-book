import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultTaskCategory } from 'app/shared/assets';
import { ITaskCategory } from 'app/shared/types';
import { fetchTasks } from '../mocks';

interface TasksState {
  categories: ITaskCategory[];
  currentCategory: ITaskCategory;
  categoriesLoading: boolean;
}

const initialState: TasksState = {
  categories: [],
  currentCategory: defaultTaskCategory,
  categoriesLoading: false,
};

export const fetchTaskCategories = createAsyncThunk(
  'taks/fetchCategories',
  async () => {
    const res = await fetchTasks();

    return res;
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentCategory: (state, { payload }: PayloadAction<ITaskCategory>) => {
      state.currentCategory = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTaskCategories.pending, state => {
        state.categoriesLoading = true;
      })
      .addCase(fetchTaskCategories.fulfilled, (state, { payload }) => {
        state.categoriesLoading = false;
        state.categories = payload;
        state.currentCategory = payload[0];
      });
  },
});

export const tasksActions = tasksSlice.actions;
export const { setCurrentCategory } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;