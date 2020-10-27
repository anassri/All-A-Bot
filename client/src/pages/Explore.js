import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBots } from '../store/bots'
import '../style/explore.css'
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';


const useStyle = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
        marginTop:  10,
    },
    paper: {
        height: '60vh',
        padding: '55px 65px',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bots: {
        textAlign: 'left',
    },
    bot:{
        paddingLeft: 10,
        paddingTop: 15,
        borderBottom: '1px solid rgba(232,232,232,0.3)',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
const ListItem = ({id,name,description,username}) => {
    const classes = useStyle();
    return (
        <CardActionArea>
            <Link key={id} to={`/bots/${id}`} style={{ color: 'inherit' }}>
            <Grid item xs={12} className={classes.bot}>
                <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                    {name}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                    <div className={classes.content}>
                        <div>
                            {description}. By  <span style={{ fontWeight: "bold" }}>{username}</span>
                        </div>
                        <div>
                            <i className="fas fa-download"></i>
                            <i className="fas fa-clone"></i>
                        </div>
                    </div>
                </Typography>
            </Grid >
            </Link>
        </CardActionArea>            
)};

export default function Explore() {
    const classes = useStyle();
    const bots = useSelector(state => state.bots.explore)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllBots())
    }, [])

    if (!bots) return null;

    console.log(bots);
    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className="paper-container">
                <div className="about-container">
                    <Typography variant="h4" component="h2" style={{ fontWeight: 'bold' }}>
                        ABOUT ALL-A-BOT
                    </Typography>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id vehicula ante, et vulputate lacus. Cras fringilla dui at convallis varius. Nunc non condimentum mi. Sed dapibus, erat at pretium luctus, est odio mattis nisl, quis imperdiet urna nunc nec nisi. Quisque eu arcu nulla. Suspendisse non congue justo, id gravida lorem. Phasellus at justo lorem.</p>
                </div>
                <Paper className={classes.paper}>
                    <Grid container spacing={3} style={{flexDirection: 'column'}}>
                        <Typography variant="h4" component="h2" className={classes.title}>
                            RECENT BOTS
                        </Typography>
                        <div className={classes.bots}>
                            {bots.map(bot => <ListItem name={bot.name}
                                                       id={bot.id}
                                                       description={bot.description} 
                                                       username={bot.owner.username}
                                                       style={{textAlign:'left'}}/>)}
                        </div>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}