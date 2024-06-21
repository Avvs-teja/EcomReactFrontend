// PlaceOrder.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert, Container, Row, Col } from 'reactstrap';

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setLoading(true);
    setError('');
    
    axios.post('http://127.0.0.1:8000/api/place-order/', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        console.log('Order placed successfully:', response.data);
        navigate('/orders');
      })
      .catch(error => {
        setError('Error placing order. Please try again later.');
        console.error('Error placing order:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mb-4 text-center">Place Order</h1>
          {error && <Alert color="danger">{error}</Alert>}
          <p className="text-center">Are you sure you want to place the order?</p>
          <div className="d-flex justify-content-center">
            <Button color="success" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'Place Order'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrder;
