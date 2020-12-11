import React, { useEffect } from 'react';
import {
    makeStyles,
    Grid,
    Paper,
    Container,
    Typography,
    Divider
} from '@material-ui/core';


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
        textAlign: 'left',
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

export default function BotSuccess() {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className="paper-container">
                <Typography variant="h4" component="h2" className={classes.title}>
                    asdasd
                </Typography>
                <Paper className={classes.paper}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={2} sm={2} className={classes.grid}>
                                <Typography variant="subtitle2" component="h2" className={classes.label}>
                                    Bot Name:
                                </Typography>

                            </Grid>
                            <Grid item xs={3} sm={6}>
                                
                            </Grid>
                        </Grid>
                        <Divider style={{ marginTop: 20 }} />
                    </div>
                    <div className={classes.icons}>
                        <div>
                            {/* <DownloadBtn bot={bot} /> */}
                        </div>
                    </div>
                </Paper>
            </Container>
        </div>
    );
}
