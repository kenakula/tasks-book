import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions, tasksActions } from 'app/store';
import { useDispatch } from 'react-redux';

const actions = {
  ...authActions,
  ...tasksActions,
};

export const useActions = (): Record<string, unknown> => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
