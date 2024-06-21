import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetProducts = ({ isAuthenticated }) => {
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  const handleAddToCart = (productId) => {
    if (isAuthenticated) {
      const token = localStorage.getItem('access_token'); // Retrieve token from localStorage

      axios.post(`http://127.0.0.1:8000/api/cart/${productId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          toast.success('Product added to cart!', {
            position: "top-right"
          });
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
          toast.error('Failed to add product to cart.', {
            position: "top-right"
          });
        });
    } else {
      navigate('/login');
    }
  };
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/getProducts/");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="mb-4">Apple Products</h1>
        <Row>
          {products.map((product, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card style={{ width: "100%" }}>
                <img src={`http://127.0.0.1:8000${product.image}`} className="card-img-top" alt="Sample" style={{ maxHeight: "400px", objectFit: "cover" }} />
                <CardBody>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardText tag="h5">
                    <FontAwesomeIcon icon={faIndianRupeeSign} />{product.price}
                  </CardText>
                  <Button color="success" className="w-50 mx-auto" onClick={() => handleAddToCart(product.id)}>
                  Add to Cart
                </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
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
      <ToastContainer />
    </div>
  );
}

export default GetProducts;





