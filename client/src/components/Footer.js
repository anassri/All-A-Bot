import React from 'react';
import Typography from '@material-ui/core/Typography';

let style = {
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}
export default function Footer() {
    return(
        <div>
            <div style={style}>
                <Typography variant="subtitle2" component="h2">
                    © 2020, All-A-Bot
                </Typography>
            </div>
        </div>
    )
}