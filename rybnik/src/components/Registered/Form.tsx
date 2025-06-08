import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Switch, FormControlLabel, Alert} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { FormData } from '../methods/interfaces';
import './Form.css';

const AUTH_TOKEN_KEY = 'authToken';
const CURRENT_USER_KEY = 'currentUser';

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
      body: JSON.stringify({ 
        username,
        password,
        name: { firstname: username, lastname: '' },
        email: `${username}@example.com`,
        phone: '1-770-736-8031',
        address: {
          city: 'Minsk',
          street: 'Unknown',
          number: 0,
          zipcode: '00000',
          geolocation: { lat: '0', lng: '0' }
        }
      }),
    });
    if (!response.ok) throw new Error('Ошибка регистрации');
    return response.json();
  },
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const user = localStorage.getItem(CURRENT_USER_KEY);
    
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      let token;
      
      if (isLogin) {
        const result = await fakeAuthAPI.login(data.username, data.password);
        token = result.token;
      } else {
        await fakeAuthAPI.register(data.username, data.password);
        const result = await fakeAuthAPI.login(data.username, data.password);
        token = result.token;
      }
      
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, data.username);
      
      setIsAuthenticated(true);
      setCurrentUser(data.username);
      alert(isLogin ? 'Вход выполнен!' : 'Аккаунт создан и вы вошли!');
      reset();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsLogin(true);
    reset();
  };

  if (isAuthenticated && currentUser) {
    return (
      <Box className="auth-container2">
        <Typography variant="h5" className="auth-title">
          <LockOpenIcon className="auth-icon" /> Ваш профиль
        </Typography>
        
        <div className="user-info">
          <Typography variant="body1" className="user-info-text">
            Вы вошли как: <strong>{currentUser}</strong>
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            className="auth-submit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Выйти
          </Button>
        </div>
        
        <Box className="auth-link-container">
          <Link to="/appdate-05.03" className="auth-link">
            <Button variant="outlined" fullWidth className="auth-home-button">
              На главную
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

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