import React, { useState, useEffect, useRef } from 'react'
import { TextField, Toolbar, Typography, Grid, Divider, Fab, ListItem, Paper, List, Avatar, ListItemIcon, ListItemText } from '@mui/material'
import PatientNavbar from './patient-navbar'
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { postMessage } from '../../../redux/conversation-slice'
import { useGetMessagesQuery } from '../../../redux/api/conversationApi'
import FilterMessage from '../doctor-pages/filter-message';

export default function MessagesPatient() {
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
  const { conversationId } = useParams()
  const { state } = useLocation()
  console.log(state);
  const myId = state.firstId
  const [message, setMessage] = useState('')
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const { data: allMessages } = useGetMessagesQuery(Number(conversationId), { refetchOnMountOrArgChange: true })
  const socketRef = useRef(null)
  const messages = useSelector(state => state.conversation[conversationId])

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
      senderId: state.firstId,
      recieverId: state.secondId,
      conversationId: Number(conversationId)
    }
    socketRef.current?.emit('chat_message', data)
  }
  return (
    <Container>
      <PatientNavbar />
      <Toolbar />
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
          <Divider />
        </Grid>
      </Grid>
      <Grid container component={Paper} className={styles.chatSection}>
        <Grid item xs={3} className={styles.borderRight500}>
          <List>
            <ListItem key={state.id}>
              <ListItemIcon>
                <Avatar alt={state.secondId}/>
              </ListItemIcon>
              <ListItemText primary={state.secondId}></ListItemText>
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Divider />
        <Grid item xs={9} sx={{border:1}}>
          <List className={styles.messageArea} sx={{ maxHeight: '500px', overflowY: 'scroll' }}>
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
