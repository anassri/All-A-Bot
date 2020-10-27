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
        display: 'flex',
        borderBottom: '1px solid rgba(232,232,232,0.3)',
    },
    action:{
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
const ListItem = ({id,name,description,username}) => {
    const classes = useStyle();
    return (
        <Grid item xs={12} className={classes.bot}>
            <CardActionArea className={classes.action}>
                <Link key={id} to={`/bots/${id}`} style={{ color: 'inherit' }}>
                    <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" component="h2">
                            <div>
                                {description}. By  <span style={{ fontWeight: "bold" }}>{username}</span>
                            </div>
                    </Typography>
                </Link>
            </CardActionArea>            
            <div className={classes.content}>
                <Link key={id} to={``} style={{ color: 'inherit' }}>
                    <i className="fas fa-download fa-lg"></i>
                </Link>
                <Link key={id} to={``} style={{ color: 'inherit' }}>
                    <i className="fas fa-clone fa-lg"></i>
                </Link>
            </div>
        </Grid >
)};

export function Explore({bots}) {
    const classes = useStyle();
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

export default function ExploreContainer() {
    const bots = useSelector(state => state.bots.explore)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadAllBots())
    }, [])

    if (!bots) return null;

    return <Explore bots={bots} />
}