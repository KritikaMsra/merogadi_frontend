import React,{useState,useEffect} from 'react';
import {Container,Col,Row,Card} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import {FaShoppingCart} from 'react-icons/fa';
import {Link} from 'react-router-dom'


const Shop = (props) => {
    let [type,setCategory] = useState("Chair");
    console.log(type)
    let [furnitures,setFurniture] = useState([]);
    useEffect(()=>{
        axios.post("http://localhost:90/product/showall",{category:type})
        .then((response)=>{
          
            if(response.data.success == true)
            {
                setFurniture(response.data.data)
            }
            else
            {
                setFurniture([])
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[type])

    const changeHandler = (e) =>{
        setCategory(
            e.target.value
        )
    }
    var token = localStorage.getItem("token");

    const loginUser = (event)=>{
        window.location.href = "/login"
    }

    return (
        <React.Fragment>
            <Container fluid className="mt-2 mb-2">
                <Row>
                    <Col lg={4} className="d-none d-md-block"></Col>
                    <Col lg={4}>
                        <select className="form-control" onChange={(event=>{changeHandler(event)})}>
                            <option value="Break Pads"> Break Pad </option>
                            <option value="Calliper Pin Kits"> Calliper Pin Kits </option>
                            <option value="Suspension Bushing Kits"> Suspension Bushing Kits</option>
                            <option value="Hub Bearing"> Hub Bearing</option>
                            <option value="Wheels"> Wheels</option>
                            <option value="Covers"> Covers</option>
                            <option value="Wipers"> Wipers</option>
                            <option value="Mirrors"> Mirrors</option>
                            <option value="Oil Filters"> Oil Filters</option>
                            <option value="Air Filters"> Air Filters</option>
                            <option value="Horns"> Horns</option>
                            <option value="Head Light"> Head Light</option>
                            <option value="Back Light"> Back Light</option>
                            <option value="Display Screen"> Display Screen</option>

                        
                            
                        </select>
                    </Col>
                    <Col lg={4} className="d-none d-md-block"></Col>
                    {
                        furnitures.length > 0?
                        (
                            
                            furnitures.map((product)=>{
                                return(
                                    <Col lg={2}>
                                        <Card className="productCards" style={{cursor:"pointer"}}>
                                                <div className="productImgs">
                                                    <Card.Img variant="top" src={`http://localhost:90/${product.pimage}`} />
                                                </div>
                                                    <Card.Body>
                                                        <Card.Title className="text-center">{product.pname}</Card.Title>
                                                       
                                                        
                                                        <div >
                                                            {
                                                                token?
                                                                (
                                                                    <Link to={`/singleProduct/`+product._id} style={{color:"black"}}><FaShoppingCart style={{float:"right"}}/></Link>  
                                                                ):
                                                                (
                                                                    <p style={{color:"black"}} onClick={(event)=>{loginUser(event)}}><FaShoppingCart style={{float:"right"}}/></p>  
                                                                )
                                                            }
                                                        
                                                        </div>
                                                         
       
                                                       
                                                    </Card.Body>
                                                
     
                                            </Card>
                                    </Col>
                                )
                            })
                        ):
                        (
                            <Col lg={12}>
                                    <p className="text-center mt-2" style={{fontWeight:"bolder"}}> No Parts on stock. </p>
                            </Col>  
                            
                        )
                       
                    }
                    <Col>

                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Shop
