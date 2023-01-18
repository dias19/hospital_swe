import React from 'react'
import {ListItem, Grid, ListItemText} from '@mui/material'
export default function FilterMessage({ message, myId }) {
    const moment=require('moment')
    return (
        <>
            {
                message.senderId == myId
                    ?
                    <ListItem key={message.id}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={message.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary={moment(message.createdAt).format('HH:mm')}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    : 
                    <ListItem key={message.id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align="left" primary={message.text}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="left" secondary={moment(message.createdAt).format('HH:mm')}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            }
        </>
    )
}
