import React from 'react';
import {
    Container,
    Paper,
    Grid,
    makeStyles,
} from '@material-ui/core';
import Guide from '../components/Guide';
const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: 1032,
        margin: '0 auto',
        position: "relative",
    },
    paper: {
        height: '60%',
        minHeight: '60vh',
        padding: '55px 65px',
    },
}));
export default function GuidePage(){
    const classes = useStyle();
    return (
        <Container maxWidth='lg' className='paper-container'>
            <div className="guide-tab-container">
                <p className="guide-text">Guide</p>
            </div>
            <Paper className={classes.paper}>
                <Grid container spacing={3} style={{ flexDirection: 'column' }}>
                    <Guide />
                </Grid>
            </Paper>
        </Container>

    )
}