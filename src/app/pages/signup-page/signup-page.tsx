import React from 'react';
import * as yup from 'yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { logIn, useAppDispatch } from '../../store';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonComponent,
  ConnectAccount,
  InputComponent,
} from 'app/components';
import { useAppSelector } from 'app/hooks';
import { HOME_PAGE, LOGIN_PAGE } from 'app/router';
import { ButtonWrapper, FormTitle, FormWrapper } from 'app/shared/assets';

interface FormModel {
  email: string;
  password: string;
  confirmPassword: string;
}

const formSchema = yup.object({
  email: yup
    .string()
    .email('Почта введена неправильно')
    .required('Это обязательное поле'),
  password: yup
    .string()
    .min(6, 'Введите не менее 6 символов')
    .required('Это обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Это обязательное поле'),
});

export const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(formSchema),
  });

  function onSubmit({ email, password }: FormModel): void {
    dispatch(logIn({ email, password })).then(() => {
      navigate(HOME_PAGE);
    });
  }

  return (
    <FormWrapper>
      <FormTitle color="primary" textAlign="center">
        Регистрация
      </FormTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent<FormModel>
          formControl={control}
          type="email"
          name="email"
          label="E-mail"
          fullwidth
          error={!!errors.email}
          errorMessage="Введите почту"
          small
          styles={{ marginBottom: '20px' }}
        />
        <InputComponent<FormModel>
          formControl={control}
          type="password"
          name="password"
          label="Пароль"
          fullwidth
          error={!!errors.password}
          errorMessage="Введите пароль"
          small
          styles={{ marginBottom: '20px' }}
        />
        <InputComponent<FormModel>
          formControl={control}
          type="password"
          name="confirmPassword"
          label="Повторите пароль"
          fullwidth
          error={!!errors.confirmPassword}
          errorMessage="Пароли не совпадают"
          small
          styles={{ marginBottom: '20px' }}
        />
        <ButtonWrapper>
          <ButtonComponent loadingIcon type="submit" loading={loading}>
            Зарегистрироваться
          </ButtonComponent>
        </ButtonWrapper>
      </Box>
      <ConnectAccount text="Есть аккаунт?" link={LOGIN_PAGE} linkText="Войти" />
    </FormWrapper>
  );
};
