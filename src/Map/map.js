import React,{useState,useEffect} from 'react';
import {GoogleMap,Marker,withGoogleMap,withScriptjs,InfoWindow} from 'react-google-maps'
import useMap from './useMap'
import {Container,Row,Col} from 'react-bootstrap'

const Map = withScriptjs(withGoogleMap((props) => {
    const {isMarkerShown} = props;
    const {garage} = useMap();

   
    
    let [selected,setSelected]  = useState("");
    let [search,setSearch] = useState("")
    let [latitude,setLatitude] = useState(27.717245);
    let [longitude,setLongitude] = useState(85.323959);
 
    const loadMarker = (data)=>{
       
        let long = data.locationPoint.coordinates[0];
        let lat =  data.locationPoint.coordinates[1];
        return (
            <Marker 
                key={data._id}
                position={{lat:lat,lng:long}}
                onClick = {()=>{setSelected(data)}}
                />
        )
    }
 
    const searchHandler = (e)=>{
        setSearch(
            e.target.value
        )
    }
 
   let filtered = garage.filter((val)=>{return val.address.toLowerCase().trim().startsWith(search.toLowerCase().trim())})
   
 
   const showPosition = (pos)=>{
     setLatitude(
         pos.coords.latitude
     )
 
     setLongitude(
         pos.coords.longitude
     )
 
     
   }
 
   useEffect(()=>{
     if(navigator.geolocation)
     {
        navigator.geolocation.getCurrentPosition(showPosition)
     }
     
   },[])
   

   return (
    <React.Fragment>
        <Container fluid>
            <Row>
                <Col lg={4}>
                <form method="post">
                    <div className="form-group">
                        <input type="text" className="form-control" name="search" placeholder="Search Locations..." onChange={(e)=>{searchHandler(e)}}/>
                    </div>
                </form>
                </Col>
              
               
            </Row>
        </Container>

       
  
  <GoogleMap
      defaultZoom={11}
      defaultCenter={{lat:latitude,lng:longitude}}>

      {
          isMarkerShown &&
          (
              filtered.length > 0&&
              (
                  filtered.map((val)=>{
                      return(
                          loadMarker(val)
                       
                      )
                  })
              )
             
          )
      
      }

      

      {
          selected&&
          (
              <InfoWindow
                  position ={
                      {
                          "lat":selected.locationPoint.coordinates[1],
                          "lng":selected.locationPoint.coordinates[0]
                      }
                  }

                  onCloseClick = {
                      ()=>{
                          setSelected(null)
                      }
                  }
              >
              <div>
                  <h5> {selected.fname} {selected.lname}  </h5>
                  <p> <strong> Contact: </strong> <small> {selected.phone_number} </small>  <strong> Email: </strong> <small> {selected.email} </small> </p>
                  <p> <strong> Address: </strong> <small> {selected.address} </small> </p>
                  <p> <strong> Distance: </strong> <small> {parseFloat((selected.dist.calculated / 1000).toPrecision(2))} KM </small> </p>
                  </div>  
              </InfoWindow>
          )
      }

      

  </GoogleMap>


</React.Fragment>
   )



}))


export default Map
