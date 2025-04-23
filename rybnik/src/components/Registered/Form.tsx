import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Switch, FormControlLabel, Alert } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import './Form.css';

type FormData = {
  username: string;
  password: string;
};

const fakeAuthAPI = {
  login: async (username: string, password: string) => {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Неверные данные');
    return response.json();
  },
  register: async (username: string, password: string) => {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Ошибка регистрации');
    return response.json();
  },
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await fakeAuthAPI.login(data.username, data.password);
        console.log('Успешный вход:', result);
        alert('Вход выполнен!');
      } else {
        const result = await fakeAuthAPI.register(data.username, data.password);
        console.log('Аккаунт создан:', result);
        alert('Аккаунт создан!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="auth-container">
      <Typography variant="h5" className="auth-title">
        {isLogin ? (
          <>
            <LockOpenIcon className="auth-icon" /> Вход
          </>
        ) : (
          <>
            <PersonAddIcon className="auth-icon" /> Регистрация
          </>
        )}
      </Typography>

      {error && <Alert severity="error" className="auth-error">{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register('username', { 
            required: 'Username обязателен',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          className="auth-input"
        />

        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { 
            required: 'Пароль обязателен', 
            minLength: { 
              value: 4, 
              message: 'Минимум 4 символа' 
            } 
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          className="auth-input"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="auth-submit"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
        </Button>

        <FormControlLabel
          control={<Switch checked={!isLogin} onChange={() => setIsLogin(!isLogin)} />}
          label={isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          className="auth-switch"
        />

        <Box className="auth-link-container">
          <Link to="/appdate-05.03" className="auth-link">
            <Button variant="outlined" fullWidth className="auth-home-button">
              На главную
            </Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default AuthForm;