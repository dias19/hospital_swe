import { Container, Toolbar, Grid, Typography, Divider, Paper, List, ListItem, ListItemText, Avatar, ListItemIcon, TextField, Fab } from '@mui/material';
import React, { useState, useEffect, useRef} from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useParams, useLocation } from 'react-router'
import { useGetMessagesQuery } from '../../../redux/api/conversationApi';
import DoctorNavbar from './doctor-navbar';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from '../../../redux/conversation-slice';
import io from 'socket.io-client'
import FilterMessage from './filter-message';
export default function SendMessagesDoctor() {
    const moment = require('moment')
    const dispatch=useDispatch()
    const styles = {
        table: {
            minWidth: 650,
        },
        chatSection: {
            width: '100%',
            height: '80vh'
        },
        headBG: {
            backgroundColor: '#e0e0e0'
        },
        borderRight500: {
            borderRight: '1px solid #e0e0e0'
        },
        messageArea: {
            height: '70vh',
            overflowY: 'auto'
        }
    }
    const [message, setMessage] = useState('')
    const token = useSelector(state => state.auth.token)
    const { conversationId } = useParams()
    const { state } = useLocation()
    const myId = state.secondId
    const { data: allMessages = [] } = useGetMessagesQuery(conversationId)
    const messages=useSelector(state=>state.conversation[conversationId])
    console.log(messages);
    const socketRef = useRef(null)
    useEffect(() => {
        const socket = io.connect('http://localhost:8800', {
            transports: ['polling', 'websocket'],
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer: ${token}`
                    }
                }
            }
        });
        socket.on('connect', () => {
            console.log('connected kaini loh');
            socketRef.current = socket
        });
        socket.on('chat_message', (data) => {
            console.log(data);
            dispatch(postMessage({ conversationId: data.message.conversationId, message: data.message }))
        });
    }, [])

    function sendMessage() {
        const data = {
            text: message,
            senderId: state.secondId,
            recieverId: state.firstId,
            conversationId: Number(conversationId)
        }
        socketRef.current?.emit('chat_message', data)
    }

    return (
        <Container>
            <DoctorNavbar />
            <Toolbar />
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container component={Paper} className={styles.chatSection}>
                <Grid item xs={3} className={styles.borderRight500}>
                    <List sx={{background:'#E0E0E3'}}>
                        <ListItem key='1'>
                            <ListItemIcon>
                                <Avatar alt='Patient' />
                            </ListItemIcon>
                            <ListItemText primary={state.firstId}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                </Grid>
                <Divider />
                <Grid item xs={9} sx={{border:1}} >
                <Divider />
                    <List className={styles.messageArea} sx={{maxHeight:'500px', overflowY:'scroll'}}>
                        {messages?.map(singleMessage => (
                            <FilterMessage message={singleMessage} myId={myId} />
                        ))}
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField
                                label="Type Something"
                                fullWidth
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab
                                color="primary"
                                onClick={sendMessage}
                            ><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}
