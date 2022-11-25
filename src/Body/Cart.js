import React,{useState,useEffect} from 'react';
import {Container,Col,Row,Card} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import {FaShoppingCart} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import {MdAddCircle} from 'react-icons/md'
import {AiFillMinusCircle} from 'react-icons/ai'



const Cart = (props) => {
    let [cart,setCart] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
    })

    useEffect(()=>{
        axios.get("http://localhost:90/retrieve/myBookings",auth.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setCart(
                    response.data.data
                    )
            }
            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const deleteBooking = (e,id)=>{
        axios.post("http://localhost:90/delete/booking",{pid:id},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal(
                    {
                        title:"Success",
                        text:response.data.message,
                        icon:"success"
                    }
                )
                window.location.reload();
            }
            else
            {
                swal(
                    {
                        title:"Error",
                        text:response.data.message,
                        icon:"error"
                    }
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const minusClick = (event,val) =>{
        var qty = document.querySelector(`.productQuantity${val._id}`);
        var price = document.querySelector(`.price${val._id}`);
        var avStock = document.querySelector(`.avStock${val._id}`);
        var myQuantity = parseInt(qty.innerHTML);
        var myPrice = parseInt(price.innerHTML);
      
        var singlePrice = myPrice/myQuantity;
        var avs = parseInt(avStock.innerHTML);
        if(myQuantity > 1)
        {
            myQuantity-=1;
            avs+=1;
            axios.post("http://localhost:90/update/booking",{pid:val._id,qty:myQuantity},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    qty.innerHTML = myQuantity;
                    avStock.innerHTML = avs;
                    price.innerHTML = singlePrice*myQuantity
                    swal(
                        {
                            title:"Success",
                            text:response.data.message,
                            icon:"success"
                        }
                    )
                    window.location.reload();
                }
                else
                {
                    swal(
                        {
                            title:"Error",
                            text:response.data.message,
                            icon:"error"
                        }
                    )
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }

    }

    const plusClick = (event,val)=>{
        var qty = document.querySelector(`.productQuantity${val._id}`);
        var avStocks = document.querySelector(`.avStock${val._id}`);
        var price = document.querySelector(`.price${val._id}`);
        var myQuantity = parseInt(qty.innerHTML);
        
        var myPrice = parseInt(price.innerHTML);
        var singlePrice = myPrice/myQuantity;
        var avStock = parseInt(val.product_id.availableStock);
        var avs = parseInt(avStocks.innerHTML);
        
        if(avStock > 0)
        {
            avs-=1;
            console.log(avs)
            myQuantity+=1;
            axios.post("http://localhost:90/update/booking",{pid:val._id,qty:myQuantity},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    qty.innerHTML = myQuantity;
                    price.innerHTML = singlePrice*myQuantity
                    avStocks.innerHTML = avs;
                    swal(
                        {
                            title:"Success",
                            text:response.data.message,
                            icon:"success"
                        }
                    )
                    window.location.reload();
                }
                else
                {
                    swal(
                        {
                            title:"Error",
                            text:response.data.message,
                            icon:"error"
                        }
                    )
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }

    }

    return (
        <React.Fragment>
            <Container fluid className="mt-2 mb-2">
                <Row>
                {
                       cart.map((val)=>{
                           return(
                               <Col lg={2}>
                            <Card className="productCards" style={{cursor:"pointer"}}>
                                                <div className="productImgs">
                                                    <Card.Img variant="top" src={`http://localhost:90/${val.product_id.pimage}`} />
                                                </div>
                                                    <Card.Body>
                                                        <Card.Title className="text-center">{val.product_id.pname}</Card.Title>
                                                       
                                                        <p> <strong>Available Stock: </strong> <span className={`avStock${val._id}`}> {val.product_id.availableStock} </span> </p>
                                                        <p><strong>Price: </strong> Rs <span className={`price${val._id}`}>{val.price}</span> </p>
                                                        <p className="text-center"><strong>Quantity:</strong></p>
                                                         <p className="text-center"> <AiFillMinusCircle style={{fontSize:"21px",color:"pink"}} onClick={(event)=>{minusClick(event,val)}}/>  <span className={`productQuantity${val._id}`}> {val.quantity} </span> <MdAddCircle style={{fontSize:"21px",color:"pink"}} onClick={(event)=>{plusClick(event,val)}}/> </p>

                                                       
                                                    </Card.Body>
                                                    <div className="text-center">
                                                    <div className="btn btn-danger btn-md mb-2 mr-1 w-50" onClick={(event)=>{deleteBooking(event,val._id)}} name="delete__booking" > Delete </div>
                                                    </div>
     
                                            </Card>
                          </Col>
                           )
                       })
                   }
                    

                    
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Cart
