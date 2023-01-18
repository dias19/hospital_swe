import React from 'react'
import { useGetConversationQuery, useGetMessagesQuery } from '../../../redux/api/conversationApi'
import { postMessage, loadMessages } from '../../../redux/conversation-slice'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DoctorNavbar from './doctor-navbar'
import { Toolbar, Typography } from '@mui/material'
export default function ListConversationDoctor() {
  const { data: conversation = [] } = useGetConversationQuery()
  return (
    <>
      <DoctorNavbar />
      <Toolbar />
      {conversation?.map(conversation => (
        <>
          <Typography align='center' variant='h5'>
            List of all conversations:
          </Typography>
          <Typography align='center' variant='h6'>
            <Link to={`/messageDoctor/${conversation.id}`}
              state={conversation}>
              {conversation.id}
            </Link>
          </Typography>
        </>
      ))}
    </>
  )
}
