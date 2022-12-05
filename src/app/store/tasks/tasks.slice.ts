import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultTaskCategory } from 'app/shared/assets';
import { ITaskCategory } from 'app/shared/types';
import { fetchCategories, saveTaskCategory } from '../mocks';

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
    const res = await fetchCategories();

    return res;
  },
);

export const addTaskCategory = createAsyncThunk(
  'tasks/saveCategory',
  async (category: ITaskCategory) => {
    const res = await saveTaskCategory(category);

    return res;
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentCategory: (state, { payload }: PayloadAction<ITaskCategory>) => {
      console.log('payload:', payload);
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
      })
      .addCase(addTaskCategory.pending, state => {
        state.categoriesLoading = true;
      })
      .addCase(addTaskCategory.fulfilled, (state, { payload }) => {
        state.categoriesLoading = false;
        state.categories = state.categories.concat(payload);
      });
  },
});

export const tasksActions = tasksSlice.actions;
export const { setCurrentCategory } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
