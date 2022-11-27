import React from 'react';
import * as yup from 'yup';
import { Box, Divider, Link, styled, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { logIn } from '../store/auth/auth-slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as FacebookIcon } from '../../assets/images/icon-fb.svg';
import { ReactComponent as TwitterIcon } from '../../assets/images/icon-tw.svg';
import { ButtonComponent, InputComponent } from '../components';
import { useAppSelector } from '../hooks';
import { HOME_PAGE, LOGIN_PAGE } from '../router';

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

const FormWrapper = styled(Box)({
  position: 'relative',
  top: '50%',
  margin: '0 auto',
  padding: 20,
  maxWidth: 350,
  borderRadius: 10,
  transform: 'translateY(-50%)',
  boxShadow: '0 10px 25px rgba(29, 52, 54, 0.2)',
});

const SocialsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '.MuiLink-root': {
    display: 'flex',
    marginRight: '20px',
    transition: 'opacity 0.2s ease-in',
    '&:hover': {
      opacity: 0.7,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
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

  function onSubmit(data: FormModel): void {
    dispatch(logIn(data.email)).then(() => {
      navigate(HOME_PAGE);
    });
  }

  return (
    <FormWrapper>
      <Typography
        color="primary"
        sx={{ fontSize: 18, fontWeight: 500, marginBottom: '20px' }}
        textAlign="center"
      >
        Регистрация
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <ButtonComponent loadingIcon type="submit" loading={loading}>
            Зарегистрироваться
          </ButtonComponent>
        </Box>
      </Box>
      <Typography
        textAlign="center"
        sx={{ fontSize: 12, marginBottom: '20px' }}
      >
        Есть аккаунт?{' '}
        <Link component={RouterLink} to={LOGIN_PAGE}>
          Войти
        </Link>
      </Typography>
      <Divider
        light
        sx={{ '.MuiDivider-wrapper': { opacity: 0.4 }, marginBottom: '20px' }}
      >
        или
      </Divider>
      <SocialsWrapper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '20px',
        }}
      >
        <Link target="_blank" rel="noreferrer" href="www.facebook.com">
          <FacebookIcon />
        </Link>
        <Link target="_blank" rel="noreferrer" href="www.twitter.com">
          <TwitterIcon />
        </Link>
      </SocialsWrapper>
    </FormWrapper>
  );
};
