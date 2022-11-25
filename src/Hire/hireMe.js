import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap'
import swal from 'sweetalert'

const HireMe = (props) => {
    let {} = props;

    let [hire,setHire] = useState({
        "fullName":"",
        "email":"",
        "contact":"",
        "address":"",
        "fee":0,
        "profile":"",
        "error":{},
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    let [btnDisable,setDisable] = useState(true)

    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setHire({
            ...hire,
            [name]:value
        })
    }

    const imageHandler = (e)=>{
        let {name,files} = e.target;
        setHire({
            ...hire,
            [name]:files[0]
        })
    }
    

    const hireMe = (e)=>{
        e.preventDefault();
        
        let fd = new FormData();
        fd.append('fullName',hire.fullName)
        fd.append('email',hire.email);
        fd.append('contact',hire.contact)
        fd.append('fee',hire.fee)
        fd.append("profile",hire.profile)
        fd.append('address',hire.address)

      
        axios.post("http://localhost:90/addMeForWork",fd,hire.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal({
                    "title":"Success",
                    "text":response.data.message,
                    "icon":"success"
                })
                window.location.href = "/"
            }
            else
            {
                setHire({
                    ...hire,
                    ['error']:response.data.error
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
   
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <h5 className="text-center">  List me as a Vehicle Repair Person  </h5>
                    </Col>
                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                    <Col lg={8}>
                        <form method="post" onSubmit={hireMe}>
                            <div className='form-group'>
                                <label> Full Name </label>
                                <input type="text" className="form-control" name="fullName" value={hire.fullName} placeholder="Enter fullname" onChange={(e)=>{changeHandler(e)}} required/>
                                {hire['error']['fullName']&& (<p> <small style={{color:"red"}}> *{hire['error']['fullName']} </small> </p>)}
                            </div>

                            <div className='form-group'>
                                <label> Email </label>
                                <input type="email" className="form-control" name="email" value={hire.email} placeholder="Enter email" onChange={(e)=>{changeHandler(e)}} required/>
                                {hire['error']['email']&& (<p> <small style={{color:"red"}}> *{hire['error']['email']} </small> </p>)}
                            </div>

                            <div className='form-group'>
                                <label> Contact </label>
                                <input type="text" maxLength="10" className="form-control" name="contact" value={hire.contact} placeholder="Enter contact" onChange={(e)=>{changeHandler(e)}} required/>
                                {hire['error']['contact']&& (<p> <small style={{color:"red"}}> *{hire['error']['contact']} </small> </p>)}
                            </div>

                            <div className='form-group'>
                                <label> Address </label>
                                <input type="text" className="form-control" name="address" value={hire.address} placeholder="Enter address" onChange={(e)=>{changeHandler(e)}} required/>
                            </div>

                            <div className='form-group'>
                                <label> Fee </label>
                                <input type="number" min="0" className="form-control" name="fee" value={hire.fee} placeholder="Enter fee" onChange={(e)=>{changeHandler(e)}} required/>
                                {hire['error']['fee']&& (<p> <small style={{color:"red"}}> *{hire['error']['fee']} </small> </p>)}
                            </div>

                            <div className='form-group'>
                                <label> Image </label>
                                <input type="file" className="form-control-file" name="profile" onChange={(e)=>{imageHandler(e)}} required/>
                                {hire['error']['profile']&& (<p> <small style={{color:"red"}}> *{hire['error']['profile']} </small> </p>)}
                            </div>

                            <div className="form-group">
                                <input type="checkbox" id="checkMe" name="checkMe" onChange={()=>{setDisable(!btnDisable)}}/>
                                <label className="ml-2" for="checkMe"> I accept terms and condition. </label>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-primary btn-md w-100" type="submit" name="hire" disabled = {btnDisable}> Hire </button>
                            </div>


                        </form>
                    </Col>
                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                </Row>

            </Container>
        </React.Fragment>
    )
}

export default HireMe
