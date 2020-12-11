import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOne } from '../store/bots'
import { 
    makeStyles,
    Grid,
    Paper,
    Container,
    Typography,
    Divider } from '@material-ui/core';
import DownloadBtn from '../components/DownloadBtn';


const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        boxSizing: 'border-box'

    },
    paper: {
        height: '60%',
        minHeight: '60vh',
        padding: '55px 65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 15,
    },
    label: {
        textAlign:'left',
        color: "rgba(232,232,232,0.7)",
        paddingTop: 15,
        // marginBottom: 10
    },
    content: {
        textAlign: 'left',
        color: "rgba(232,232,232,1)",
        fontWeight: 'bold',
        paddingTop: 10,
    },
    grid: {
        maxWidth: '10%'
    },
    icons: {
        textAlign: 'right',
        opacity: 0.7
    }


}));
function Entry({label, msg}){
    const classes = useStyle();
    return (
        <>
            <Grid item xs={3} sm={2} className={classes.grid}>
                <Typography variant="subtitle2" component="h2" className={classes.label}>
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={3} sm={2}>
                <Typography variant="subtitle1" component="h2" className={classes.content} style={{paddingTop: 11}}>
                    {msg}
                </Typography>
            </Grid>
        </>
    )
}
function Rule({rule}){
    const content = JSON.parse(rule.content)
    const triggerData = content["trigger"];
    const responseData = content["response"];
    return (
        <>
            <Grid container spacing={2} direction="row">
                <Entry label="On:" msg={triggerData.type} />
                {Object.keys(triggerData.details).map((key)=>
                    <Entry label={key.charAt(0).toUpperCase() + key.slice(1)} msg={triggerData.details[key]} />
                )}
            </Grid>
            {responseData.map((res)=>
                <Grid container spacing={2} direction="row">
                    <Entry label="Response:" msg={res.type} />
                    <Entry label="String:" msg={res.details.string} />
                </Grid>
            )}
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
    
    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className="paper-container">
                <Typography variant="h4" component="h2" className={classes.title}>
                    {bot.name.toUpperCase()}
                </Typography>
                <Paper className={classes.paper}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={2} sm={2} className={classes.grid}>
                                <Typography variant="subtitle2" component="h2" className={classes.label}>
                                    Bot Name:
                                </Typography>
                                <Typography variant="subtitle2" component="h2" className={classes.label}>
                                    Description:
                                </Typography>
                                {bot.prefix
                                    ? <Typography variant="subtitle2" component="h2" className={classes.label}>Prefix:</Typography>
                                    : null}

                            </Grid>
                            <Grid item xs={3} sm={6}>
                                <Typography variant="subtitle1" component="h2" className={classes.content}>
                                    {bot.name}
                                </Typography>
                                <Typography variant="subtitle1" component="h2" className={classes.content}>
                                    {bot.description}
                                </Typography>
                                {bot.prefix
                                    ? <Typography variant="subtitle1" component="h2" className={classes.content}>{bot.prefix}</Typography>
                                    : null}
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop: 20}}/>

                            {bot.rules.map((rule) =>
                                <>
                                    <Rule key={rule.id} rule={rule} />
                                    <Divider style={{marginTop: 15}} />
                                </>
                            )}
                    </div>
                    <div className={classes.icons}>
                        <div>
                            <DownloadBtn bot={bot} />
                        </div>
                    </div>
                </Paper>
            </Container>
        </div>
    );
}
