import { makeStyles } from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../style/explore.css'
const useStyle = makeStyles((theme)=>({
    root: {
        maxWidthLg: '1080'
    },
    paper: {
        height: '60vh'
    
    }
}));
const ListItem = () => (
    <>
    </>
);

export default function Explore() {
    const classes = useStyle();
    return (
        // <div className={classes.root}>
        <Container maxWidth="lg" className="paper-container">
            <div className="about-container">
                <h1>ABOUT ALL-A-BOT</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id vehicula ante, et vulputate lacus. Cras fringilla dui at convallis varius. Nunc non condimentum mi. Sed dapibus, erat at pretium luctus, est odio mattis nisl, quis imperdiet urna nunc nec nisi. Quisque eu arcu nulla. Suspendisse non congue justo, id gravida lorem. Phasellus at justo lorem.</p>
            </div>
            <Paper className={classes.paper}/>
        </Container>
    );
}