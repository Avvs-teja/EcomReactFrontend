import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const GetProducts = () => {
    const [products, setProducts] = useState([]);

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
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
            <h1 className="mb-4">Apple Products</h1>
            <Row>
                <Col md={6} className="grid">
                    {products.map((product) => (
                        <div key={product.id}>
                            <Card style={{ width: "24rem" }}>
                                <img src={`http://127.0.0.1:8000${product.image}`} className="card-img-top" alt="Sample" style={{ maxHeight: "400px", objectFit: "cover" }} />
                                <CardBody>
                                    <CardTitle tag="h5">{product.name}</CardTitle>
                                    <CardText>{product.description}</CardText>
                                    <CardText>Rs: {product.price}</CardText>
                                    <Button color="success" className="w-50 mx-auto">Add to Cart</Button>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </Col>
            </Row>
            <h6 className="mb-4 mt-4">CopyRight @Apple Products</h6>
        </div>
    );
}

export default GetProducts;
