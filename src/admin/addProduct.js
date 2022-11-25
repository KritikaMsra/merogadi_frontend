import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import '../style.css';
import swal from 'sweetalert'
import axios from 'axios'
const AddProduct = (props) => {
    let [product,setProduct] =useState({
        "pname":"",
        "pdesc":"",
        "pprice":0,
        "discount":0,
        "availableStock":"",
        "brand":"",
        "category":"Chair",
        "pimage":"",
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

    const addProductToDB = (e)=>{
        e.preventDefault();
        let fData = new FormData();
        fData.append("pname",product.pname);
        fData.append("pdesc",product.pdesc);
        fData.append("pprice",product.pprice);
        fData.append("discount",product.discount);
        fData.append("availableStock",product.availableStock);
        fData.append("brand",product.brand);
        fData.append("category",product.category);
        fData.append("pimage",product.pimage);

        axios.post("http://localhost:90/product/insert",fData,product.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal({
                    "title":"Success",
                    "text":response.data.message,
                    "icon":"success"
                })
                
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

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <form method = "post" onSubmit ={addProductToDB} className="bg-white p-5">
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
                                <label> Category </label>
                                <select name="category" className="form-control" onChange={(event)=>{changeHandler(event)}}>
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
                                <button className="btn btn-primary btn-md w-50" name="add
                                Product" type="submit"> Add Product </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddProduct
