import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [customerData, setCustomerData] = useState({
    email: '',
    address: '',
    city: '',
    state: '',
    phone_number: '',
  });
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    email: '',
    phone_number: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCustomerData = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/customer/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const { customer_name, email, phone_number, address, city, state } = response.data;
      setCustomerData(response.data);
      setShippingDetails({
        name: customer_name,
        address: address,
        city: city,
        state: state,
        zipCode: '',
        country: '',
        email: email,
        phone_number: phone_number,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching customer data', error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Checking out...');
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post('http://127.0.0.1:8000/api/checkout/', shippingDetails, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        clearCart();
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error('Error during checkout', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h1 className="my-4">ShippingDetails</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={shippingDetails.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={shippingDetails.zipCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingDetails.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="mt-3">
          Complete Order
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
