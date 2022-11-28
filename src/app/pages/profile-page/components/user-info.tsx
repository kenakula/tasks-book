/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  getAvatarLetters,
  getUsernameColorString,
} from '../../../shared/assets';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  Socials,
} from '../../../components';
import { useAppDispatch } from '../../../store';
import { saveUserInfo } from '../../../store/auth/auth-slice';
import { UserModel } from '../../../shared/types';

const CustomAvatar = styled(Avatar, {
  shouldForwardProp: prop => prop !== 'background',
})<{ background: string }>(({ theme, background }) => ({
  width: 100,
  height: 100,
  backgroundColor: background,
  [theme.breakpoints.up('xl')]: {
    width: 150,
    height: 150,
  },
}));

const FileInput = styled('input')({
  display: 'none',
});

const InputWrapper = styled(Box)({
  width: '100%',
  '& .MuiTypography-root': {
    display: 'block',
    marginBottom: '10px',
    fontSize: 14,
    fontWeight: 500,
  },
});

type FormModel = {
  name: string;
  email: string;
  userImage: string;
  subscribed: boolean;
};

const formSchema = yup.object({
  name: yup.string().required('Введите не менее одного символа'),
  email: yup
    .string()
    .email('Неправильно введена почта')
    .required('Введите вашу почту'),
});

interface Props {
  user: UserModel;
  loading: boolean;
}

export const UserInfo = ({
  user: { name, email, subscribed, userImage },
  loading,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const onInputFileSelect = (): void => {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    defaultValues: { name, email, subscribed },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = ({
    name: userName,
    email: userEmail,
    subscribed: userSubscribed,
  }: FormModel): void => {
    dispatch(
      saveUserInfo({
        name: userName,
        email: userEmail,
        subscribed: userSubscribed,
        userImage: '',
      }),
    );
  };

  return (
    <Box sx={{ display: 'flex', columnGap: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '10px',
        }}
      >
        <CustomAvatar background={getUsernameColorString(name)} src={userImage}>
          {getAvatarLetters(name)}
        </CustomAvatar>
        <Tooltip title="Не более 2 Mb">
          <>
            <FileInput
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={onInputFileSelect}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="text"
                component="span"
                size="small"
                sx={{ textTransform: 'none' }}
              >
                изменить фото
              </Button>
            </label>
          </>
        </Tooltip>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ flexGrow: 1 }}
      >
        <InputWrapper sx={{ marginBottom: '30px' }}>
          <Typography component="label" htmlFor="name-input">
            Ваш никнейм:
          </Typography>
          <InputComponent
            type="text"
            formControl={control}
            error={!!errors.name}
            name="name"
            id="name-input"
            fullwidth
          />
        </InputWrapper>
        <InputWrapper sx={{ mb: 1 }}>
          <Typography component="label" htmlFor="email-input">
            Ваша почта:
          </Typography>
          <InputComponent
            type="email"
            formControl={control}
            error={!!errors.email}
            name="email"
            id="email-input"
            fullwidth
          />
        </InputWrapper>
        <CheckboxComponent
          formControl={control}
          name="subscribed"
          label="Подписаться на рассылку"
        />
        <Box sx={{ paddingTop: '30px', marginBottom: '30px' }}>
          <Typography sx={{ marginBottom: '10px' }}>
            Ваши социальные сети:
          </Typography>
          <Socials styles={{ justifyContent: 'flex-start' }} />
        </Box>
        <ButtonComponent loadingIcon loading={loading} type="submit">
          Сохранить изменения
        </ButtonComponent>
      </Box>
    </Box>
  );
};
