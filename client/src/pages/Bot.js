import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOne } from '../store/bots'
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';


const useStyle = makeStyles((theme) => ({
    root: {
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
    label: {
        textAlign:'left',
        color: "rgba(232,232,232,0.7)",
        marginBottom: 10
    },
    content: {
        textAlign: 'left',
        color: "rgba(232,232,232,1)",
        fontWeight: 'bold',
    },
    action: {
        paddingTop: 15,
        paddingLeft: 15,
    },
    
}));

function Rule({rule}){
    const content = JSON.parse(rule.content)
    const triggerData = content["trigger"];
    console.log(triggerData)
    return (
        <>
            prefix: {rule.prefix}
            on: {triggerData.type}
            message: {triggerData.details.string}
            {}
        </>
    )
}

export default function Bot(){
    const classes = useStyle();
    const bot = useSelector(state => state.bots.one)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(loadOne(id))
    }, [])
    if (!bot) return null;
    console.log(bot.rules)
    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className="paper-container">
                <Typography variant="h4" component="h2" className={classes.title}>
                    {bot.name.toUpperCase()}
                </Typography>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={3} sm={2}>
                            <Typography variant="subtitle2" component="h2" className={classes.label}>
                                Bot Name:
                            </Typography>
                            <Typography variant="subtitle2" component="h2" className={classes.label}>
                                Description:
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={6}>
                            <Typography variant="subtitle1" component="h2" className={classes.content}>
                                {bot.name}
                            </Typography>
                            <Typography variant="subtitle1" component="h2" className={classes.content}>
                                {bot.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider style={{marginTop: 20}}/>
                    {bot.rules.map((rule) => 
                        <>
                            <Grid container spacing={3}>
                                <Rule key={rule.id} rule={rule} />
                            </Grid>
                            <Divider style={{marginTop: 20}}/> 
                        </>  
                    )}
                </Paper>
            </Container>
        </div>
    );
}

