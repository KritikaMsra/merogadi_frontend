import React,{useState,useEffect} from 'react'
import {Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const SingleProduct = (props) => {
    let [product,setProduct] = useState({});
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
    })

    useEffect(()=>{
        axios.get("http://localhost:90/product/single/"+props.match.params.pid)
        .then((response)=>{
            setProduct(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[product])

    const addProductToCart = (e)=>{
        axios.post("http://localhost:90/book/furniture",{"product_id":props.match.params.pid,"quantity":1,"delivery_address":"Not Added","delivery_number":"Not Added"},auth.config)
        .then((response)=>{
            if(response.data.success == true){
                swal({
                    title:"Success",
                    "text":response.data.message,
                    "icon":"success"
                })
                window.location.href = "/shop"
            }
            else
            {
                swal({
                    title:"Error",
                    "text":response.data.message,
                    "icon":"error"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <Container>
                <Row className="product__wrapper">
                    <Col lg={6}>
                        <div className="product__img">
                            <img src={`http://localhost:90/${product.pimage}`} alt="product" className="d-block"/>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <h5 className="text-center mt-2"> {product.pname} </h5>
                        <table class="table table-dark mt-4">
                        <thead>
                        <tr>
                            <th scope="col">Brand</th>
                            <td> {product.pBrand} </td>
                            </tr>
                            <tr>
                            <th scope="col">Available Stock</th>
                            <td> {product.availableStock} </td>
                            </tr>
                            <tr>
                            <th scope="col">Discount</th>
                            <td> {product.discount}% </td>
                            </tr>
                            <tr>
                            <th scope="col">Price</th>
                            <td> {
                                    product.newPrice > 0?
                                    (
                                        <>
                                        <span> Rs {product.newPrice} </span> <span style={{textDecoration:"line-through"}}> Rs {product.pprice} </span>
                                        </>
                                    ):
                                    (
                                        <span> Rs {product.pprice} </span>
                                    )                                
                                } </td>
                            </tr>
                            <tr>
                            <th scope="col">Description</th>
                            <td> {product.pdesc} </td>
                            </tr>
                        </thead>
                        </table>
                    </Col>
                    <Col lg={12}>
                        <button className="btn btn-outline-primary" name="addToCart" type="button" style={{float:"right"}} onClick={(event)=>{addProductToCart(event)}}> Add To Cart </button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default SingleProduct
