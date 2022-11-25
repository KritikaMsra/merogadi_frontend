import { Component, state } from "react";
import {Container, Row, Col, SubmitUser, ThemeProvider} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert'

class Register extends Component{

    state = {
        fname : "",
        lname : "",
        email : "",
        address : "",
        phone_number : "",
        username : "",
        password : "",
        latitude:"",
        longitude:""

    }
    SubmitUser=(e)=>{
        e.preventDefault();
        const userdata = {
            fname : this.state.fname,
            lname : this.state.lname,
            email : this.state.email,
            address : this.state.address,
            phone_number : this.state.phone_number,
            password:this.state.password,
            username:this.state.username,
            latitude:this.state.latitude,
            longitude:this.state.longitude
           

        }
        
        axios.post("http://localhost:90/added/insert",userdata)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal({
                    "title":"Success",
                    "text":response.data.message,
                    "icon":"success"
                })
                window.location.href="/login" 
            }
            else
            {
                swal({
                    "title":"Error",
                    "text":response.data.message,
                    "icon":"error"
                })
            }
           
        })
        .catch((err)=>{
            console.log(err);
        })
       

    }


    render(){
        return(
            <div className="container">
                    <div className="row">
                        <div className = "col-lg-12 mainBackground">
                            <div className="row">
                                <div className="col-lg-2 d-none d-md-block"></div>
                                <div className="col-lg-8 registerform mt-5 p-5">
                                    <form method="post" className="login-form">
                                        <h5 className="text-center"> Register </h5>
                                        <div className="form-group">
                                            <label> Fname </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.fname} 
                                                onChange={(event)=>this.setState({fname: event.target.value})} className="form-control" name='fn' required placeholder="Enter Firstname"/>
                                                
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Lname </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.lname}
                                                onChange={(event)=>this.setState({lname: event.target.value})} className="form-control" name='ln' required placeholder="Enter Lastname"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Address </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.address}
                                                onChange={(event)=>this.setState({address: event.target.value})} className="form-control" name='ln' required placeholder="Enter Address"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Email </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="email" value={this.state.email}
                                                onChange={(event)=>this.setState({email: event.target.value})} className="form-control" name='ln' required placeholder="Enter email"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Phone_Number </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.phone_number}
                                                onChange={(event)=>this.setState({phone_number: event.target.value})} className="form-control" name='ln' required placeholder="Enter phone number"/>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label> Username </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.usernanme}
                                                onChange={(event)=>this.setState({username: event.target.value})} className="form-control" name='un' required placeholder="Enter username"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Longitude </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.longitude}
                                                onChange={(event)=>this.setState({longitude: event.target.value})} className="form-control" name='longitude' required placeholder="Enter longitude"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Latitude </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="text" value={this.state.latitude}
                                                onChange={(event)=>this.setState({latitude: event.target.value})} className="form-control" name='un' required placeholder="Enter latitude"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label> Password </label>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    
                                                </div>
                                                <input type="password" value={this.state.password}
                                                onChange={(event)=>this.setState({password: event.target.value})} className="form-control" name='pw' required placeholder="Enter Password"/>
                                            </div>
                                        </div>
                                        
                                        <button onClick={this.SubmitUser} type="submit" className="btn btn-primary btn-block" style={{borderRadius:"10px",boxShadow:"inset 0px 0px 5px white",padding:"9px"}} name="register"> Register </button>
                                    </form>
                                </div>
                                <div className="col-lg-2 d-none d-md-block"></div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}




export default Register;