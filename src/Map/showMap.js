import React from 'react'
import Map from './map'
import {Container,Row,Col} from 'react-bootstrap'
 
const ShowMap = () => {
    return (
        <React.Fragment>
          <Container fluid>
              <Row>
                  <Col lg={12}>
                      <h5 className="text-center" style={{fontWeight:"bolder",color:"black",fontSize:"22px"}}> Nearby Garages </h5>
                  </Col>
                  <Col lg={12}>
                  <div style={{width:"100%"}}>
                        <Map 
                        isMarkerShown={true}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyATrxpFbJS8VYnAuaCfPrhtafbYMlMBUNo&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />} 
            
                        />
                        </div>
                  </Col>
              </Row>
          </Container>
          
        </React.Fragment>
    )
}
 
export default ShowMap