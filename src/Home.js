import React, { useEffect, useState} from 'react';
import {
  Container, Row, Col, Button, Card, CardBody, CardTitle, CardText,
  Carousel, CarouselItem, CarouselControl, CarouselIndicators, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import appleLogo from './assets/apple-logo.jpeg';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'; 


const Home = ({ isAuthenticated }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  
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
      navigate('/register');
    }
  };

  const handleBuyNow = (productId) => {
    if (isAuthenticated) {
      const token = localStorage.getItem('access_token'); // Retrieve token from localStorage

      axios.post(`http://127.0.0.1:8000/api/cart/${productId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
        toast.error('Failed to add product to cart.', {
          position: "top-right"
        });
      });
      navigate('/place-order', { state: { productId } });
    } else {
      navigate('/register');
    }
  };


  const toggleModal = () => setModal(!modal);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === Math.ceil(featuredProducts.length / 4) - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? Math.ceil(featuredProducts.length / 4) - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/getProducts/");
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    }
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    toggleModal();
  };

  const slides = [];

  for (let i = 0; i < Math.ceil(featuredProducts.length / 4); i++) {
    const slideItems = featuredProducts.slice(i * 4, (i + 1) * 4).map((product, index) => (
      <Col sm={3} key={index}>
        <Card className="mb-4 shadow-effect" onClick={() => openProductModal(product)}>
          <br />
          <img src={`http://127.0.0.1:8000${product.image}`} alt="Product" className="img-fluid mx-auto d-block" />
          <CardBody className="text-center">
            <CardTitle tag="h5">{product.name}</CardTitle>
            <CardText tag="h5">
              <FontAwesomeIcon icon={faIndianRupeeSign} />{product.price}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    ));
    slides.push(
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={i}
      >
        <Row>{slideItems}</Row>
      </CarouselItem>
    );
  }

  const newProductsCarouselItems = (
    <div className="bg-white p-3">
      <h2 className="mb-3 text-dark text-center">New Products</h2>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="mt-2"
        interval={7000}
      >
        {featuredProducts.map((product, index) => (
          <CarouselItem
            key={index}
            className={index === activeIndex ? "active" : ""}
          >
            <Row className="justify-content-center">
              <Col sm={6} className="text-center">
                <img src={`http://127.0.0.1:8000${product.image}`} alt={`Product ${index + 1}`} className="img-fluid shadow-effect" style={{ maxWidth: '600px' }} />
                <CardTitle tag="h5" className="mt-3 text-dark">{product.name}</CardTitle>
              </Col>
            </Row>
          </CarouselItem>
        ))}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        <CarouselIndicators items={featuredProducts} activeIndex={activeIndex} onClickHandler={(index) => goToIndex(index)} />
      </Carousel>
    </div>
  );

  return (
    <div className="home-wrapper">
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src={appleLogo} alt="Apple Logo" className="img-fluid" />
          </Col>
          <Col md={6}>
            <h1 className="display-4 mb-4">Welcome to the Apple Store</h1>
            <p className="lead">Discover the latest Apple products, explore amazing features, and find the best deals.</p>
            <p className="mb-4">From iPhones to MacBooks, iPads to Apple Watches, we've got everything you need to stay connected and productive.</p>
            <Link to="/" className="btn btn-success me-3">Shop Now</Link>
            <Link to="/Contact" className="btn btn-info">Contact Us</Link>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="mb-4">Featured Products</h2>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <br />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
              <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={(index) => goToIndex(index)} />
            </Carousel>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            {newProductsCarouselItems}
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{selectedProduct?.name}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <img src={`http://127.0.0.1:8000${selectedProduct?.image}`} alt="Product" className="img-fluid" />
            </Col>
            <Col md={6}>
              <h5>Description:</h5>
              <ul>
                {selectedProduct?.description.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h5>
                <FontAwesomeIcon icon={faIndianRupeeSign} />{selectedProduct?.price}
              </h5>
              <Button color="success me-3" onClick={() => handleAddToCart(selectedProduct.id)}>
                Add to Cart
              </Button>
              <Button color="warning" onClick={() => handleBuyNow(selectedProduct.id)}>
                Buy Now
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
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
      <ToastContainer />
    </div>
  );
};

export default Home;
