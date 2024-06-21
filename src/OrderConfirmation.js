import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you can perform any additional logic if needed,
    // such as fetching order details based on an order ID.
  }, []);

  const handleContinueShopping = () => {
    navigate('/products'); // Adjust the path as necessary
  };

  return (
    <Container className="text-center my-5">
      <h1>Order Confirmation</h1>
      <p className="my-4">Thank you for your purchase! Your order has been successfully placed.</p>
      <p className="my-4">You will receive an email confirmation shortly with the details of your order.</p>
      <Button variant="primary" onClick={handleContinueShopping}>
        Continue Shopping
      </Button>
    </Container>
  );
};

export default OrderConfirmation;
