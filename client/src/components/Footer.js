import React from 'react';
import Typography from '@material-ui/core/Typography';

let style = {
    background: 'url("../images/footer.svg")',
    zIndex: -1,
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

let phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}
export default function Footer() {
    return(
        <div>
            <div style={phantom} >
            </div>
            
            <div style={style}>
                <Typography variant="subtitle2" component="h2">
                    © 2020, All-A-Bot
                </Typography>
            </div>
        </div>
    )
}