/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getAvatarLetters,
  getUsernameColorString,
  InputWrapper,
} from 'app/shared/assets';
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  Socials,
} from 'app/components';
import { useAppDispatch, saveUserInfo } from 'app/store';
import { UserModel } from 'app/shared/types';
import { InfoWrapper, CustomAvatar, FileInput } from './custom-components';

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
    <InfoWrapper>
      <Box>
        <CustomAvatar background={getUsernameColorString(name)} src={userImage}>
          {getAvatarLetters(name)}
        </CustomAvatar>
        <FileInput
          accept="image/*"
          id="button-file"
          type="file"
          onChange={onInputFileSelect}
        />
        <label htmlFor="button-file">
          <Button
            variant="text"
            component="span"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            изменить фото
          </Button>
        </label>
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
          <InputComponent<FormModel>
            type="text"
            formControl={control}
            error={!!errors.name}
            name="name"
            id="name-input"
            fullwidth
            disabled={loading}
          />
        </InputWrapper>
        <InputWrapper sx={{ mb: 1 }}>
          <Typography component="label" htmlFor="email-input">
            Ваша почта:
          </Typography>
          <InputComponent<FormModel>
            type="email"
            formControl={control}
            error={!!errors.email}
            name="email"
            id="email-input"
            fullwidth
            disabled={loading}
          />
        </InputWrapper>
        <CheckboxComponent
          formControl={control}
          name="subscribed"
          label="Подписаться на рассылку"
          disabled={loading}
        />
        <Box sx={{ paddingTop: '30px', marginBottom: '30px' }}>
          <Typography sx={{ marginBottom: '10px' }}>
            Ваши социальные сети:
          </Typography>
          <Socials />
        </Box>
        <ButtonComponent loadingIcon loading={loading} type="submit">
          Сохранить изменения
        </ButtonComponent>
      </Box>
    </InfoWrapper>
  );
};
