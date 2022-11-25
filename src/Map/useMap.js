import React,{useState,useEffect} from 'react';
import axios from 'axios';

const useMap = () => {
    let [garage,setGarage] = useState([]);
    let [latitude,setLatitude] = useState(27.717245);
    let [longitude,setLongitude] = useState(85.323959);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })


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
      

    useEffect(()=>{
        axios.post(process.env.REACT_APP_URL+"fetchAllUsers2",{"longitude":longitude,"latitude":latitude},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setGarage(
                    response.data.data
                )
            }
            else
            {
                setGarage(
                    []
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return {garage};
}

export default useMap
