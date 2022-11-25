import React from 'react';
import { Component } from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import styled from 'styled-components';

class AboutUs  extends Component {
    render(){
  return (
    <main>
      
     <Container className="my-5">
       <Row>
         <Col>
         <Wrapper className="page section section-center">
        <img src="bed.jpg" alt="about img w-100" />
        <article>
          <div className="title">
            <h2>about us</h2>
            <div className="underline"></div>
          </div>
          <p>
            Furniture World will leverage the core strengths of the group in
            understanding diverse consumer & trade behaviour, retail
            distribution network, brand equity, global sourcing & cost effective
            supply chain management, which are critical success factors in this
            sector. The core vision of Furniture World is "to be the first
            choice partner of customers aspiring for Value for Style home
            interior solutions". A chain of large retail format stores under the
            brand name "Furniture World- Home With Soul" is operating across the
            country. Furniture World Stores showcase over 20000+ world-class
            contemporary products in Home Furniture, Soft Furnishings, Home
            Decor & Accessories & Wall Fashion.
          </p>
        </article>
      </Wrapper>
         </Col>
       </Row>
     </Container>
    </main>
  );
    }
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    text-transform: normal;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutUs;
