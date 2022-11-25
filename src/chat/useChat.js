import React,{useState,useEffect} from 'react';
import axios from 'axios';

const useChat = () => {
    
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })
    let [users,setUsers] = useState([]);
    let [recentChat,setRecent] = useState([]);
    let [unSeen,setUnSeen] = useState({});
    

    

    //users
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchAllUsers",auth.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setUsers(
                    response.data.data
                )
            }
            else
            {
                setUsers([]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    //recently talked with users
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"myInteractions",auth.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setRecent(
                    response.data.data
                )

                
            }
            else
            {
                setRecent([])
                
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    //myUnseen
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchMyUnseen",auth.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setUnSeen(response.data.data);
            }
            else
            {
                setUnSeen(response.data.data);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    
    return {users,recentChat,unSeen};
}

export default useChat
