import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Container, Row, Col
} from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details', error);
        setError('Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const handleBack = () => {
    navigate('/orders');
  };

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center mt-5">{error}</div>;
  }

  if (!order) {
    return <div className="container text-center mt-5">Order not found.</div>;
  }

  return (
    <>
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button onClick={handleBack} className="btn btn-dark">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Orders
        </button>
      </div>
      <div className="card">
        <h5 className="card-header bg-dark text-white">Order Details</h5>
        <div className="card-body">
          <h5 className="card-title">Order ID: #{order.id}</h5>
          <p className="card-text">Total Amount: ₹{parseFloat(order.total_amount).toFixed(2)}</p>
          <p className="card-text">Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <p className="card-text">Shipping Status: {order.shipping_status}</p>
          <hr />
          <h5 className="card-title mt-4">Ordered Items:</h5>
          <div className="row">
            {order.items && order.items.map((item, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {item.product?.image && (
                          <img src={item.product.image} alt={item.product.name} className="img-fluid rounded" style={{ maxHeight: '150px' }} />
                        )}
                      </div>
                      <div className="col-md-8">
                        <h5 className="card-title text-success">{item.product?.name || 'Product name unavailable'}</h5>
                        <p className="card-text text-warning"><strong>Quantity:</strong> {item.quantity}</p>
                        <p className="card-text text-danger"><strong>Price:</strong> ₹{item.product?.price.toFixed(2) || 'N/A'}</p>
                        <p className="card-text"><strong>Description:</strong></p>
                        <ul className="card-text">
                          {item.product?.description.split('\r\n').map((line, idx) => (
                            <li key={idx}>{line}</li>
                          )) || 'No description available'}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <footer className="footer bg-dark py-3">
        <Container>
          <Row className="justify-content-center">
            <Col xs="auto" className="text-center text-white">
              <a href="https://www.facebook.com" className="btn btn-outline-light me-3"><FaFacebook /></a>
              <a href="https://www.twitter.com" className="btn btn-outline-light me-3"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="btn btn-outline-light"><FaInstagram /></a>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs="auto" className="text-center text-white">
              &copy; { new Date().getFullYear()} Apple Store. All rights reserved.
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default OrderDetail;
