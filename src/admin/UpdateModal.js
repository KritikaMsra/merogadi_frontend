import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import swal from 'sweetalert'

const UpdateModal = (props) => {
    const {item} = props;
    let [product,setProduct]=useState({
        "pname":item.pname,
        "pdesc":item.pdesc,
        "pprice":item.pprice,
        "pimage":item.pimage,
        "availableStock":item.availableStock,
        "brand":item.pBrand,
        "discount":item.discount,
        "onSale":item.onSale,
        "id":item._id,
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
        
    })

    const changeHandler = (e)=>{
        var {name,value} = e.target;
        setProduct(
            {
                ...product,
                [name]:value
            }
        )
    }


    const fileHandler = (e)=>{
        var {name,files} = e.target;
        setProduct(
            {
                ...product,
                [name]:files[0]
            }
        ) 
    }

    const updatePost = (e)=>{
        e.preventDefault();
        let fData = new FormData();
        fData.append("pname",product.pname)
        fData.append("pdesc",product.pdesc)
        fData.append("pprice",product.pprice)
        fData.append("pimage",product.pimage)
        fData.append("availableStock",product.availableStock)
        fData.append("brand",product.brand)
        fData.append("discount",product.discount)
        fData.append("onSale",product.onSale)
        fData.append("id",product.id)
        console.log(fData)
        axios.post("http://localhost:90/product/update",fData,product.config)
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
            <div class="modal fade" id={`updateProduct${item._id}`} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Edit {item.pname}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form method = "post"  className="bg-white" onSubmit={updatePost}>
                            <div className="form-group">
                                <label> Product Name </label>
                                <input type="text" className="form-control" name="pname" value={product['pname']} onChange={(event)=>{changeHandler(event)}} required/>
                            </div>
                            <div className="form-group">
                                <label> Brand </label>
                                <input type="text" className="form-control" name="brand" value={product['brand']} onChange={(event)=>{changeHandler(event)}} required/>
                            </div>
                            <div className="form-group">
                                <label> Price </label>
                                <input type="text" className="form-control" name="pprice" value={product['pprice']} onChange={(event)=>{changeHandler(event)}} required/>
                            </div>
                            <div className="form-group">
                                <label> Available Stock </label>
                                <input type="text" className="form-control" name="availableStock" value={product['availableStock']} onChange={(event)=>{changeHandler(event)}} required/>
                            </div>
                          
                            <div className="form-group">
                                <label> Product Image </label>
                                <input type="file" className="form-control-file" name="pimage" accept="image/*" onChange={(event)=>{fileHandler(event)}} required/>
                            </div>
                            <div className="form-group">
                                <label> Description </label>
                                <textarea className="form-control" name="pdesc" value={product['pdesc']} onChange={(event)=>{changeHandler(event)}}></textarea>
                            </div>
                            <div className="form-group">
                                <label> Discount </label>
                                <input type="number" className="form-control" name="discount" value={product['discount']} onChange={(event)=>{changeHandler(event)}} required/>
                            </div>

                            
                            <div className="text-center">
                                <button className="btn btn-primary btn-md w-50" name="addProduct" type="submit"> Update Product </button>
                            </div>
                        </form>
      </div>
      </div>
      </div>
      </div>
        </React.Fragment>
    )
}

export default UpdateModal
