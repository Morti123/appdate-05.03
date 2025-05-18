import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  FormHelperText 
} from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CartItem } from '../ProductList/ProductList';
import './Pay.css';
import { Link } from 'react-router-dom';


type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'card' | 'cash';
};

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems: CartItem[] = location.state?.cartItems || [];

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'card',
    },
    mode: 'onBlur',
  });

  const paymentMethod = watch('paymentMethod');

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (parseFloat(item.product.prices) * item.quantity),0);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Order submitted:', { ...data, items: cartItems });
    alert('Заказ успешно оформлен!');
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <Box className="empty-cart-container">
        <Typography variant="h5" gutterBottom>
          Ваша корзина пуста
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          className="back-button"
        >
          Вернуться к покупкам
        </Button>
      </Box>
    );
  }

  return (
    <Box className="checkout-container">
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Назад
      </Button>

      <Typography variant="h4" gutterBottom className="checkout-title">
        <LocalGroceryStoreIcon fontSize="large" />
        Оформление заказа
      </Typography>

      <Paper elevation={3} className="order-summary">
        <Typography variant="h6" gutterBottom>
          Ваш заказ
        </Typography>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.product.id}>
              <ListItem className="order-item">
                <ListItemText
                  primary={`${item.product.full_name} (${item.quantity} шт.)`}
                  secondary={`${(parseFloat(item.product.prices) * item.quantity).toFixed(1)} BYN`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          <ListItem className="order-total">
            <ListItemText primary="Итого:" />
            <Typography variant="subtitle1">
              {(calculateTotal()).toFixed(1)} BYN
            </Typography>
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} className="checkout-form">
        <Typography variant="h6" gutterBottom>
          Данные для доставки
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="ФИО"
                error={!!errors.name}
                helperText={errors.name?.message}
                className="form-input"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                className="form-input"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^\+?[0-9]{7,15}$/,
                message: 'Некорректный номер телефона'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Телефон"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                className="form-input"
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 10,
                message: 'Минимум 10 символов'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Адрес доставки"
                multiline
                rows={2}
                error={!!errors.address}
                helperText={errors.address?.message}
                className="form-input"
              />
            )}
          />

          <Box className="payment-methods" mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              Способ оплаты
            </Typography>
            <Box className="payment-buttons">
              <Button
                variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
                onClick={() => setValue('paymentMethod', 'card')}
                className="payment-button"
              >
                Картой онлайн
              </Button>
              <Button
                variant={paymentMethod === 'cash' ? 'contained' : 'outlined'}
                onClick={() => setValue('paymentMethod', 'cash')}
                className="payment-button"
              >
                Наличными при получении
              </Button>
            </Box>
            {errors.paymentMethod && (
              <FormHelperText error>
                {errors.paymentMethod.message}
              </FormHelperText>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            className="submit-button"
            sx={{ mt: 3 }}
          > 
          <Link to="/appdate-05.03" className="auth-link">
            Подтвердить заказ
            </Link>
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Checkout;