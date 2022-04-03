import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './chat.css'
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat';



function Chat() {
    const [input, setInput] = useState("");
    const[seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName , setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [ {user} , dispatch] = useStateValue();
    
    useEffect(() => {
        if (roomId) {
            // this piece of code pulls the chat rooms from the DB
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => snapshot? setRoomName(snapshot.data().name) : setRoomName(''));
            
            // this piece of code pulls the messages from the chat rooms with their exact timestamp from the DB
            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) =>
                doc.data()))
            ); 
        }  
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },
    [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()? firebase.firestore.FieldValue.serverTimestamp() : '',

        })

        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

            <div className='chat__headerInfo' >
                <h3>{roomName}</h3>
                <p>Last seen {" "},
                {/* this piece of code gets the timestamp the last recipent in the chatroom was seen */}
                { messages[messages.length - 1]? new Date(
                    messages[messages.length - 1].timestamp.toDate()
                ).toUTCString() : ''}
                </p>
                
            </div>
                <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={ `chat__message ${
                        message.name === user.displayName &&"chat__reciever"}`}>
                    <span className='chat__name'>
                        {message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                          {message.timestamp? new Date(message.timestamp.toDate()).toUTCString() : ''}  
                        </span> 
                    </p>
                ))} 
            </div>

            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type="text" />
                    <button onClick={sendMessage} type="submit" >Send a Message</button>
                </form>

                <Mic />
            </div>
        </div>
    )
}

export default Chat
