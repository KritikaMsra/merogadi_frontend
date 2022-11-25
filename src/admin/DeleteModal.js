import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import swal from 'sweetalert'

const UpdateModal = (props) => {
    const {item} = props;
    let [product,setProduct]=useState({
     
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
        
    })

   

    const deleteBooking = (e)=>{
       
        axios.delete("http://localhost:90/product/delete/"+item._id,product.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal({
                    title:"Success",
                    text:response.data.message,
                    icon:"success"
                })
                window.location.reload();
            }
            else
            {
                swal({
                    title:"Error",
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return (
        <React.Fragment>
            <div class="modal fade" id={`deleteProduct${item._id}`} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Do you really want to remove {item.pname}?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p> Do you really want to remove {item.pname}? </p>
        <div className="text-center">
            <button className="btn btn-danger btn-md w-50" name="deleteBooking" onClick={deleteBooking}> Delete </button>
        </div>
      </div>
      </div>
      </div>
      </div>
        </React.Fragment>
    )
}

export default UpdateModal
