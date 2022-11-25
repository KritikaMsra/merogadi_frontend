import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Container,Row,Col,Card} from 'react-bootstrap'

const Repairman = (props) => {
    const {} = props;
    let [repairman,setRepairman] = useState([]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"getWorkers")
        .then((response)=>{
            if(response.data.success == true)
            {
                setRepairman(
                    response.data.data
                )
            }
            else
            {
                setRepairman([])
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <h5 className="text-center" style={{fontWeight:"bolder"}}> Repairman List </h5>
                    </Col>
                    {
                        repairman.length > 0?
                        (
                            repairman.map((val)=>{
                                return (
                                    <Col lg={4}>
                                        <Card className="productCard">
                                            <div className="productImg">
                                                <Card.Img variant="top" src={`http://localhost:90/${val.userPhoto}`} />
                                            </div>
                                                <Card.Body>
                                                    <Card.Title className="text-center">{val.fullName}</Card.Title>
                                                  
                                                  
                                                        <p> <strong>Address: </strong> {val.address} </p>
                                                        <p> <strong>Email: </strong> {val.email} </p>
                                                   

                                                    <div>
                                                        <p style={{float:"right"}}> <strong>Contact: </strong> {val.contact} </p>
                                                        <p style={{float:"left"}}> <strong>Fee: </strong> Rs {val.fee} </p>
                                                    </div>
                                                  
                                                    

                            
                                                   
                                                </Card.Body>
                                            
 
                                        </Card>
                                    </Col>
                                )
                            })
                        ):
                        (
                            <p className="text-center"> No Records </p> 
                        )
                    }
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Repairman
