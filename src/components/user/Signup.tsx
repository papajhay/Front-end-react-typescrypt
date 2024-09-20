import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from '../../context/SnackbarContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormContainer } from '../styledComponents/FormContainer';
import { MainContainer } from '../styledComponents/MainContainer';
import LoadingSpinner from '../LoadingSpinner';
import { useIntl } from 'react-intl';
import { SignupFormInputs } from '../../type/interface/navBar/navBar';

const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const intl = useIntl()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

 // Définir le schéma de validation Yup avec intl.formatMessage
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: 'mixed.required' }))
      .matches(/^\D+$/, {
        message: intl.formatMessage({ id: 'username.noNumbers' }),
      }),
    email: Yup.string()
      .required(intl.formatMessage({ id: 'mixed.required' }))
      .email(intl.formatMessage({ id: 'string.email' })),
    password: Yup.string()
      .required(intl.formatMessage({ id: 'mixed.required' }))
      .min(4, intl.formatMessage({ id: 'string.min' }, { min: 4 })),
  });                                             

  // Utiliser useForm pour gérer le formulaire
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  // Fonction de soumission du formulaire
  const onSubmit: SubmitHandler<SignupFormInputs> = async (values) => {
    try {
      const response = await fetch('http://localhost:3001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        showMessage(intl.formatMessage({ id: 'registrationSuccess' }), 'success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || intl.formatMessage({ id: 'registrationFailed' }), 'error');
      }
    } catch (error) {
      showMessage(intl.formatMessage({ id: 'errorDuringRegistration' }) + (error as Error).message, 'error');
    }
  };

  if (isLoading) {
      return (<LoadingSpinner/>);
  }


  return (
    <MainContainer>
      <FormContainer sx={{ marginLeft: 93 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: 'signup.title' })}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} noValidate>
            <TextField
              label={intl.formatMessage({ id: 'signup.username' })}
              data-testid="usernameInput"
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register('username')}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label={intl.formatMessage({ id: 'signup.mail' })}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label={intl.formatMessage({ id: 'signup.pass' })}
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, textTransform: 'none' }}
            >
              {intl.formatMessage({ id: 'signup.button' })}
            </Button>
          </Box>
        </Box>
      </FormContainer>
    </MainContainer>
  );
};

export default Signup;
