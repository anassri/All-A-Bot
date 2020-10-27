import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBots } from '../store/bots'
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
    },
    paper: {
        height: '60vh',
        padding: '55px 65px',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 15,
    },
    bots: {
        textAlign: 'left',
    },
    bot: {
        display: 'flex',
        borderBottom: '1px solid rgba(232,232,232,0.3)',
    },
    action: {
        paddingTop: 15,
        paddingLeft: 15,
    },
    content: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 5,
        paddingLeft: 20
    }
}));

export default function Bot(){
    const classes = useStyle();
    const bots = useSelector(state => state.bots.explore)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadAllBots())
    }, [])

    if (!bots) return null;

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className="paper-container">
                <Typography variant="h4" component="h2" className={classes.title}>
                    SOME RANDOM BOT
                </Typography>
                <Paper className={classes.paper}>
                    <Grid container spacing={3} style={{ flexDirection: 'column' }}>
                        <Typography variant="h4" component="h2" className={classes.title}>
                            RECENT BOTS
                        </Typography>
                        
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}