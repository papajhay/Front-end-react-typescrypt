import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';
import { FormContainer } from '../styledComponents/FormContainer';
import { MainContainer } from '../styledComponents/MainContainer';
import { ScaleLoader } from 'react-spinners'; 
import { useIntl } from 'react-intl';
import LoadingSpinner from '../LoadingSpinner';

const Login: React.FC = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(true); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const intl = useIntl();
    const { showMessage } = useSnackbar();

    useEffect(() => {
        // Simule un temps de chargement avant d'afficher la page de connexion
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 3000);

        return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (response.ok) {
            showMessage(intl.formatMessage({ id: 'connectionSuccess' }), 'success');
            setIsSubmitting(true);
                setTimeout(() => {
                    setIsSubmitting(false); 
                    navigate('/');
                }, 3000); 
            } else {
            showMessage(intl.formatMessage({ id: 'connectionFailed' }), 'error');
            }
        } catch (error) {
            showMessage(intl.formatMessage({ id: 'errorDuringConnection' }) + (error as Error).message, 'error');
        }
    };

    if (isLoading) {
        return (<LoadingSpinner/>);
    }

    if (isSubmitting) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {intl.formatMessage({ id: 'spinner.loading' })}
                </Typography>
                <ScaleLoader color="#ff1d5e" loading={isSubmitting} />
            </Box>
        );
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
                        {intl.formatMessage({ id: 'signin.title' })}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={intl.formatMessage({ id: 'signup.mail' })}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={intl.formatMessage({ id: 'signup.pass' })}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, mb: 2, textTransform: 'none' }}
                        >
                            {intl.formatMessage({ id: 'signin.button' })}
                        </Button>
                    </Box>
                </Box>
            </FormContainer>
        </MainContainer>
    );
};

export default Login;
