import { Component, state, DeleteProduct } from "react";
import { Carousel,Container, Row, Col, CardDeck, Card,Image } from 'react-bootstrap';
import Register from './Register';
import Login from './Login'
import { Link, Route } from 'react-router-dom'
import axios from 'axios';

import React from "react";


let dataBox = [
  {
    "image": "https://m.economictimes.com/thumb/msid-79838229,width-1200,height-900,resizemode-4,imgsize-517740/all-new-audi-a4-will-be-launched-next-month-.jpg"
    , "title": "-BMW"
  },
  {
    "image": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201910/mercedes_gle_suv_660_102719094135.jpg"
    , "title": "-Mercedes"
  },
  {
    "image": "https://s7d1.scene7.com/is/image/hyundai/accent-01:4-3?qlt=85,0"
    , "title": "-Hyundai"
  },
  {
    "image": "https://i0.wp.com/gadgetsgaadi.com/wp-content/uploads/2020/09/SUZUKI-S.presso-gadgetsgaadi.png?resize=650%2C451&ssl=1"
    , "title": "-Suzuki"
  }



]

class Body extends Component {
  state = {
    products: []
  }
  componentDidMount() {
    axios.get("http://localhost:90/product/showall")
      .then((response) => {
        console.log(response)
        this.setState({
          products: response.data
        })
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  DeleteProduct = (prod_id) => {
    console.log(prod_id);
    axios.get('http://localhost:90/product/delete/' + prod_id)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }


  render() {
    return (
      <>
        <Container >
          <Carousel >
            <Carousel.Item >
              <img
                className="d-block w-100" 
                style={{height:"600px"}}
                src="https://www.shopee365.com/media/codazon/slideshow/cache/1920x730/c/a/car-auto-parts-online-at-lowest-price.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{height:"600px"}}
                src="https://s3-ap-southeast-1.amazonaws.com/p2swebsite/images/smeKhabar/news/autoparts_1567052826782_29.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{height:"600px"}}
                src="https://cooperbodyshop.com/wp-content/uploads/2020/08/Home-Header-min.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>

        <Container>
          <Row className="mt-2 mb-2">
            <Col lg={4}>
              <div className="furniture__info">
                <h5 className="text-center"> Delivery and Installation </h5>
                <p className="text-center">  All over Kathmandu </p>
              </div>
            </Col>

            <Col lg={4}>
              <div className="furniture__info">
                <h5 className="text-center"> Bulk Buy Negotiable </h5>
                <p className="text-center">  Special discount buying in bulk </p>
              </div>
            </Col>

            <Col lg={4}>
              <div className="furniture__info">
                <h5 className="text-center"> Expert Advice </h5>
                <p className="text-center">  Free Consultant </p>
              </div>
            </Col>
          </Row>

          <div>
            <p class="hover"> Explore More products</p>

          </div>
          <Row>








          </Row>
        </Container>

        <Container fluid>
          <Row>
            {
              dataBox.map((val) => {
                return (
                  <Col lg={3}>

                    <div className="image__detail">
                      <img src={val.image} alt="image" className="d-block w-100"  />

                    </div>
                    <p>{val.title}</p>
                  </Col>
                )
              })
            }
          </Row>
        </Container>

        <Container className="mt-4 bg-white">
          <Row>
          
        <Col md={4} >
<p className="pt-5 topicspace h5 " >The Modular Office</p>
<p className="mt-3">Show-off your new modern and modular office to your visitors!

</p>
<p>The modular workstation from GeeKen combines maximal comfort, high quality and excellent ergonomics and functional
   properties.This stylish and modern workstation is a real good office partner in any office environment.</p>
   <Link to='/' className="btn btn-outline-dark mt-5 w-40">SHOP NOW</Link>
        </Col>
        <Col md={8} className="image__detailtest">

<Image src="https://www.cnet.com/a/img/KlKZ0pE6R3R62MUCIqVnM9S2Zps=/2021/07/28/0333c9ab-7d9c-43a7-950f-ff24a021c837/audi-a6-e-tron-concept-ogi.jpg" className="w-100 h-100"/>

        </Col>
          </Row>

        </Container>
        <Container fluid className="moreabout mb-2 px-0">
          <Row>
            <Col md={2} className="moreabout text-white">

            </Col>
            <Col md={4} className="moreabout text-white">
<p className="pt-5">more about</p>
<p className="h4 pb-2">The Company</p>
<p className="mt-2">FunFurnish.com is an online content driven marketplace for home and office products. With assortments of products of international as well as local brands, Funfurnish.com offers new, exciting, convenient and a quality assuring way to shop for furniture, décor products and home appliances in Nepal.MeroGadi is the web application that solves the daily problem faced by the vehicle owners in terms of repairing or servicing. Everyone’s time schedule is packed with some busy schedule. So, it is a difficult task for an individual to visit multiple places to find the item which is required for their vehicle. The item can be the part of repair work or the fancy items. To cope up with the running problem, MeroGadi comes in action offering an online platform for the customers to buy and sell required goods. The company delivers across Nepal and is dedicated to provide prompt customer service and facilities like free assembly and delivery.</p>
<Link to='/' className="btn btn-outline-light mt-3 mb-2  w-40 px-5 py-2">Learn More</Link>
            </Col>
            <Col md={6}>
              <img src="https://www.shopee365.com/media/codazon/slideshow/cache/1920x730/c/a/car-auto-parts-online-at-lowest-price.jpg" className="w-100 h-100" width="100%" fluid/>
            </Col>
          </Row>
        </Container>


        
      </>
    )
  }
}
export default Body;
