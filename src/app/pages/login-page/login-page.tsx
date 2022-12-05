import React from 'react';
import * as yup from 'yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonComponent,
  ConnectAccount,
  InputComponent,
} from 'app/components';
import { useAppSelector } from 'app/hooks';
import { SIGNUP_PAGE } from 'app/router';
import { useAppDispatch, logIn } from 'app/store';
import { ButtonWrapper, FormTitle, FormWrapper } from 'app/shared/assets';

interface FormModel {
  email: string;
  password: string;
}

const formSchema = yup.object({
  email: yup
    .string()
    .email('Неправильно введена почта')
    .required('Введите вашу почту'),
  password: yup
    .string()
    .min(6, 'Введите не менее 6 символов')
    .required('Введите пароль'),
});

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const from = location.state?.from?.pathname || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(formSchema),
  });

  function onSubmit({ email, password }: FormModel): void {
    dispatch(logIn({ email, password })).then(() => {
      navigate(from, { replace: true });
    });
  }

  return (
    <FormWrapper>
      <FormTitle color="primary" textAlign="center">
        Вход в аккаунт
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
        <ButtonWrapper>
          <ButtonComponent loadingIcon type="submit" loading={loading}>
            Войти
          </ButtonComponent>
        </ButtonWrapper>
      </Box>
      <ConnectAccount
        text="Еще нет аккаунта?"
        link={SIGNUP_PAGE}
        linkText="Регистрация"
      />
    </FormWrapper>
  );
};
