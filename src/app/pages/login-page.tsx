import React from 'react';
import * as yup from 'yup';
import { Box, Divider, Link, styled, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonComponent, InputComponent, Socials } from 'app/components';
import { useAppSelector } from 'app/hooks';
import { SIGNUP_PAGE } from 'app/router';
import { useAppDispatch, logIn } from 'app/store';

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

const FormWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: '50%',
  margin: '0 auto',
  padding: 20,
  maxWidth: 350,
  borderRadius: 10,
  transform: 'translateY(-50%)',
  boxShadow: '0 10px 25px rgba(29, 52, 54, 0.2)',
  background: theme.palette.background.paper,
}));

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

  function onSubmit({ email }: FormModel): void {
    dispatch(
      logIn({ name: email, email, userImage: '', subscribed: false }),
    ).then(() => {
      navigate(from, { replace: true });
    });
  }

  return (
    <FormWrapper>
      <Typography
        color="primary"
        sx={{ fontSize: 18, fontWeight: 500, marginBottom: '20px' }}
        textAlign="center"
      >
        Вход в аккаунт
      </Typography>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <ButtonComponent loadingIcon type="submit" loading={loading}>
            Войти
          </ButtonComponent>
        </Box>
      </Box>
      <Typography
        textAlign="center"
        sx={{ fontSize: 12, marginBottom: '20px' }}
      >
        Еще нет аккаунта?{' '}
        <Link component={RouterLink} to={SIGNUP_PAGE}>
          Регистрация
        </Link>
      </Typography>
      <Divider
        light
        sx={{ '.MuiDivider-wrapper': { opacity: 0.4 }, marginBottom: '20px' }}
      >
        или
      </Divider>
      <Socials />
    </FormWrapper>
  );
};
