import React from 'react';
import Typography from '@material-ui/core/Typography';

let style = {
    textAlign: "center",
    padding: "20px",
    marginBottom: 10,
    // height: "60px",
    width: "1032",
    maxWidth: 1032,
}
let parent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}
export default function Footer() {
    return(
        <div style={parent}>
            <div style={style}>
                <p>
                   All-A-Bot was developed 
                </p>
                <Typography variant="subtitle2" component="h2">
                    © 2020, All-A-Bot
                </Typography>
            </div>
        </div>
    )
}