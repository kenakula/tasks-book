import React from 'react';
import * as yup from 'yup';
import { DialogComponent, InputComponent } from 'app/components';
import { InputWrapper } from 'app/shared/assets';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useAppSelector } from 'app/hooks';
import { addTaskCategory, useAppDispatch } from 'app/store';

type FormModel = {
  name: string;
};

const formSchema = yup.object({
  name: yup.string().required('Введите не менее одного символа'),
});

interface Props {
  openState: boolean;
  onClose: () => void;
}

export const CategoryDialog = ({ openState, onClose }: Props): JSX.Element => {
  const { categories } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<FormModel>({
    defaultValues: { name: '' },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = ({ name }: FormModel): void => {
    const isDuplicate = categories.some(
      cat => cat.name.toLowerCase() === name.toLowerCase(),
    );
    clearErrors();

    if (isDuplicate) {
      setError(
        'name',
        { message: 'Такая категория уже существует' },
        { shouldFocus: true },
      );
    } else {
      dispatch(addTaskCategory({ name, alias: name })).then(() => {
        onClose();
      });
    }
  };

  return (
    <DialogComponent
      title="Добавить новую категорию"
      handleClose={onClose}
      openState={openState}
      confirmLabel="Добавить"
      handleConfirm={handleSubmit(onSubmit)}
    >
      <InputWrapper sx={{ mb: 1 }}>
        <Typography component="label" htmlFor="category-input">
          Введите название категории
        </Typography>
        <InputComponent<FormModel>
          type="text"
          formControl={control}
          error={!!errors.name}
          errorMessage={errors.name?.message}
          name="name"
          id="category-input"
          fullwidth
          small
          startIcon={<QuestionMarkIcon />}
        />
      </InputWrapper>
    </DialogComponent>
  );
};
