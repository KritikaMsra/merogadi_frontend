import React,{useState,useEffect} from 'react';
import {Container,Col,Row,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FiSmile} from 'react-icons/fi'
import {FaUserAlt} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {AiOutlineMessage,AiFillEye} from 'react-icons/ai'
import {AiOutlineSend} from 'react-icons/ai'
import './chat.css';
import axios from 'axios';
import io from 'socket.io-client';
import useChat from './useChat';
import swal from 'sweetalert';


const socket = io.connect("http://localhost:90",{ transports: ['websocket', 'polling', 'flashsocket'] });

const Chat = (props) => {
    const {} = props;
    const {users,recentChat,unSeen} = useChat();
    let user = JSON.parse(localStorage.getItem('user'));
    let [chats,setChat] = useState([]);

    let [message,setMessage] = useState({
        "message":"",
        "receiverId":"",
        "userName":"",
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })
    let [search,setSearch] = useState("");
    let [searchProgress,setProgress] = useState(true);
    let [eyeball,setEyeball] = useState("Not Seen");
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })


    //connect socket
    useEffect(()=>{
        const receiverId = message.receiverId
        socket.once("chatMessage",(message)=>{
               
                if((message.sender._id == user._id && message.receiver._id == receiverId) || (message.receiver._id == user._id && message.sender._id == receiverId))
                {
                    
                    setChat(
                        [...chats,message]
                    )
                }
                
                else
                {
                    setChat(chats)
                }
        })

       
        
    },[JSON.stringify(chats)])

    useEffect(()=>{
        var scrollingDiv = document.querySelector(".chat-messages");
        scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
    },[JSON.stringify(chats)])

    //fetch Chats with selected user
    useEffect(()=>{
        axios.post(process.env.REACT_APP_URL+"getChatMessages",{"receiver":message.receiverId},message.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setChat(
                    response.data.data
                )

                setEyeball(response.data.eyeball)
            }
            else
            {
                setChat(
                    []
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[message.receiverId])
    
    const sendMessage = (e)=>{
        e.preventDefault();

        axios.post(process.env.REACT_APP_URL+"sendMessage",message,message.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                socket.emit("chatMessage",response.data.data);
                setMessage({
                    ...message,
                    ['message']:""
                })
                
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

    const changeHandler = (e)=>{
        
        var {name,value} = e.target;
        setMessage(
            {
                ...message,
                [name]:value
            }
        )
    }

    const searchHandler = (e)=>{
        
        setSearch(
            e.target.value.trim().toLowerCase()
        )

        setProgress(true)
    }

    const changeUser = (e,id,username)=>{
        setMessage(
            {
                ...message,
                ['receiverId']:id,
                ['userName']:username
            }
        )
        setProgress(false)
        unSeen[id]=0;
    }

  

    
    let filterUser = users.filter((val)=>{return val.fname.trim().toLowerCase().startsWith(search) || val.lname.trim().toLowerCase().startsWith(search) || val.username.trim().toLowerCase().startsWith(search) || val.email.trim().toLowerCase().startsWith(search)})
    let unSeenUser = Object.keys(unSeen);
   
   
   
 
    return (
        <React.Fragment>
            <div class="chat-container">
    <header class="chat-header">
    <Container fluid>
        <Row>
            <Col lg={3}>
            <h1><i class="fas fa-smile"></i>Chat</h1>
            </Col>
            <Col lg={7}>
               
                <form method="post" style={{marginTop:"10px"}}>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search Users..." name="search"  onChange={(event)=>{searchHandler(event)}}/>
                            <div className="input-group-append">
                                <span className="input-group-text" style={{width:"45px",background:"#047CC2",color:"white"}}><FaSearch/></span>
                            </div>
                        </div>
                    </div>
                </form>
            </Col>
            <Col lg={2}>
            <Link to="/" style={{color:"white",fontWeight:"bolder",marginTop:"10px"}} className="btn btn-warning">Leave Chat</Link>
            </Col>
        </Row>
    </Container>
      
      
    </header>
    <main class="chat-main">
      <div class="chat-sidebar">
        <h3><FiSmile/> Lets Talk:</h3>
        <h2 id="room-name">Fun Furnish</h2>
        
        <h3 className="mb-1"><FaUserAlt/>Recent</h3>
     
        {
            recentChat.length > 0?
            (
                <div className="recentInteractions">
                    {
                        recentChat.map((val)=>{
                            return (
                                <ul onClick={(event)=>{changeUser(event,val._id,val.username)}}>
                                    <li>
                                    <Container fluid>
                                        <Row>
                                            <Col lg={3}>
                                            {
                                                val.profileImg != "no-img.jpg"?
                                                (
                                                    <img src={`${process.env.REACT_APP_URL}${val.profileImg}`} alt="logo" className="d-block"/>
                                                ):
                                                (
                                                    <img src={`${process.env.PUBLIC_URL}/gugoui.PNG`} alt="logo" className="d-block"/>
                                                )
                                            }
                                     
                                            </Col>
                                            <Col lg={4}>
                                           <small style={{position:"relative",top:"2px",fontWeight:"bold"}}> {val.username}
                                               
                                            </small>
                                            </Col>

                                            <Col lg={4}>
                                                {
                                                    unSeenUser.includes(val._id)?
                                                    (
                                                        unSeen[val._id] > 0 && 
                                                        (
                                                        <span style={{background:"rgba(255,255,255,0.6)",color:"red",padding:"4px",fontSize:"10px",fontWeight:"bold",float:"right",marginTop:"4px"}}>
                                                            {unSeen[val._id]}
                                                        </span>
                                                        )
                                                    ) :
                                                    (
                                                       <></>
                                                    )  
                                                }
                                               
                                            </Col>
                                        </Row>
                                    </Container>
                                   
                                     
                                     
                                     
                                     </li>
                                </ul>
                            )
                        })
                    }
                </div>
            ):
            (
                <></>
            )
        }
        
      </div>
      <div class="chat-messages">
                    {/* {
                        message.receiverId !="" && searchProgress == false?
                        (
                            <p className="text-center mb-0" style={{fontWeight:"bold",fontSize:"20px",color:"gray"}}> {message.userName} </p>
                        ):
                        (
                            <></>
                        )
                    } */}
                    
                    {
                        message.receiverId !="" && searchProgress == false?
                        (
                            
                            chats.length > 0 ?
                            (
                               
                                
                                chats.map((val)=>{
                                    return (

                                            
                                            val.receiver._id == user._id?
                                            (
                                                <div class="message" style={{background:"pink"}}>
                                                    <p className="meta">{val.sender.username} <small style={{color:"black",fontSize:"9px"}}>{val.dateAndTime}</small></p>
                                                    <p className="text">
                                                        {val.message}
                                                    </p>
                                                </div>
                                            ):
                                            (
                                                <div class="message">
                                                    <p className="meta">You <small style={{color:"black",fontSize:"9px"}}>{val.dateAndTime}</small></p>
                                                    <p className="text">
                                                        {val.message}
                                                    </p>
                                                    {/* {
                                                        val.receiverStatus != "Not Seen" &&
                                                        (
                                                            <p style={{float:"right",color:"grey"}}> <AiFillEye/> </p>
                                                        )
                                                    } */}
                                                </div>
                                            )
                                           
                                    )
                                })
                                
                               
                                
                            
                            ):
                            (
                                <p className="text text-center" style={{fontWeight:"bolder",fontSize:"32px"}}> No Chat record found!! </p>
                            )
                            
                        ):
                        (
                           filterUser.length > 0?
                           (
                               <Container fluid>
                                   <Row>
                                        {
                                            filterUser.map((val)=>{
                                            return (
                                                <Col lg={3}>
                                                <Card className="userCard">
                                                <div className="imgCard">
                                                {
                                                    val.profileImg != "no-img.jpg"?
                                                    (
                                                        <Card.Img variant="top" src={`${process.env.REACT_APP_URL}${val.profileImg}`}/>
                                                    ):
                                                    (
                                                        <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/gugoui.PNG`}/>
                                                    )
                                                }
                                                
                                                </div>
                                                <Card.Body>
                                                    <p style={{fontSize:"12px",fontWeight:"bolder",marginBottom:"0px"}} className="text-center">{val.fname} {val.lname} ({(parseFloat((val.dist.calculated/1000).toPrecision(2)))} KM)</p>
                                                  
                                                    <div className="text-center">
                                                        <button className="btn btn-primary btn-md w-50 mt-2" style={{boxShadow:"2px 2px 2px rgba(0,0,0,0.6)"}} name="message" type="button" onClick={(event)=>{changeUser(event,val._id,val.username)}}> <AiOutlineMessage style={{fontSize:"25px",paddingBottom:"2px"}}/></button>
                                                    </div>
                                                </Card.Body>
                                                </Card>
                                                </Col>
                                            )
                                })
                                        }
                                   </Row>
                               </Container>
                               
                           ):
                           (
                            <p className="text text-center" style={{fontWeight:"bolder",fontSize:"32px"}}> No Users:( </p>
                           )
                        )
                        
                    }

                    {
                        eyeball != "Not Seen"?
                                (
                                    <p style={{float:"right",color:"grey"}}> <small>{eyeball}</small> </p>   
                                ):
                                (
                                    <></>
                                )
                    }
				
                    
                  
      </div>
    </main>
    {
        message.receiverId != ""  && searchProgress == false ?
        (
            <div class="chat-form-container">
    <Container>
        <Row>
            <Col lg={2} className="d-none d-md-block"></Col>
            <Col lg={8}>
            <form id="chat-form" method="post" onSubmit={sendMessage}>
      

    
      
        <input
          id="msg"
          type="text"
          placeholder="Write a message..."
          name="message"
          value={message.message}
          onChange={(event)=>{changeHandler(event)}}
          required
          autoComplete="off"
          className='form-control'
        />
       
        <button type="submit" class="btn btn-primary ml-2 w-25">Send</button>
      </form>
            </Col>
        </Row>
    </Container>
      
    </div>
        ):
        (
            <></>
        )
    }
   
  </div>
        </React.Fragment>
    )
}

export default Chat
