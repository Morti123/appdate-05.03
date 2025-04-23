import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CartItem } from '../ProductList/ProductList';
import './Pay.css';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems: CartItem[] = location.state?.cartItems || [];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card',
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.product.prices) * item.quantity), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { ...formData, items: cartItems });
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
              {calculateTotal().toFixed(1)} BYN
            </Typography>
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} className="checkout-form">
        <Typography variant="h6" gutterBottom>
          Данные для доставки
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="ФИО"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Адрес доставки"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            multiline
            rows={2}
            className="form-input"
          />

          <Box className="payment-methods">
            <Typography variant="subtitle1" gutterBottom>
              Способ оплаты
            </Typography>
            <Box className="payment-buttons">
              <Button
                variant={formData.paymentMethod === 'card' ? 'contained' : 'outlined'}
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className="payment-button"
              >
                Картой онлайн
              </Button>
              <Button
                variant={formData.paymentMethod === 'cash' ? 'contained' : 'outlined'}
                onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                className="payment-button"
              >
                Наличными при получении
              </Button>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            className="submit-button"
          >
            Подтвердить заказ
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Checkout;