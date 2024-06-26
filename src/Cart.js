import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/api/cart/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartItems(response.data.cart_items);
      setTotalPrice(response.data.total_price);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:8000/api/cart/${productId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart', error);
    }
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return;
    }
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:8000/api/cart/${productId}/`, { quantity }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item quantity', error);
    }
  };

  const handlePlaceOrder = () => {
    navigate('/place-order');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cartItems.length) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-muted">
                            {cartItems.length} items
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />

                        {cartItems.map((item, index) => (
                          <MDBRow key={index} className="mb-4 d-flex justify-content-between align-items-center">
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                src={item.image_url}
                                fluid className="rounded-3" alt={item.product_name} />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography tag="h6" className="text-muted">
                                {item.product_name}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                              <MDBBtn color="link" className="px-2" onClick={() => handleUpdateCartQuantity(item.product_id, item.quantity - 1)}>
                                <FontAwesomeIcon icon={faMinus} />
                              </MDBBtn>

                              <MDBInput type="number" min="1" value={item.quantity} size="sm" readOnly />

                              <MDBBtn color="link" className="px-2" onClick={() => handleUpdateCartQuantity(item.product_id, item.quantity + 1)}>
                                <FontAwesomeIcon icon={faPlus} />
                              </MDBBtn>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="text-end">
                              <MDBTypography tag="h6" className="mb-0">
                                {item.total_price.toFixed(2)}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <a href="#!" className="text-muted" onClick={() => handleRemoveFromCart(item.product_id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </a>
                            </MDBCol>
                          </MDBRow>
                        ))}

                        <hr className="my-4" />

                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <MDBCardText tag="a" href="#!" className="text-body" onClick={() => navigate('/')}>
                              <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                              Shopping
                            </MDBCardText>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                          Summary
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-uppercase">
                            items {cartItems.length}
                          </MDBTypography>
                          <MDBTypography tag="h5">{totalPrice.toFixed(2)}</MDBTypography>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Shipping
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                            <option value="1">Standard-Delivery</option>
                            <option value="2">Express-Delivery</option>
                            <option value="3">Next-Day Delivery</option>
                          </select>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Give code
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput size="lg" label="Enter your code" />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total price
                          </MDBTypography>
                          <MDBTypography tag="h5">{totalPrice.toFixed(2)}</MDBTypography>
                        </div>

                        <MDBBtn color="dark" block size="lg" onClick={handlePlaceOrder}>
                          Place Order
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <footer className="footer bg-dark py-3 mt-auto">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto text-center text-white">
              <a href="https://www.facebook.com" className="btn btn-outline-light me-3"><FaFacebook /></a>
              <a href="https://www.twitter.com" className="btn btn-outline-light me-3"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="btn btn-outline-light"><FaInstagram /></a>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-auto text-center text-white">
              &copy; 2024 Apple Store. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Cart;
