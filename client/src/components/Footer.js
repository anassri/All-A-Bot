import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../style/footer.css';

let style = {
    textAlign: "center",
    marginBottom: 10,
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
                   All-A-Bot was built to help Discord members create custom bots for their servers. 
                </p>
                <p>
                    AAB was developed by:
                </p>
                <div className="developers-container">
                    <div className="developer-container">
                        <p>Ammar Nassri</p>
                        <div className="developer-links-container">
                            <a className="social-a" href="https://github.com/anassri"><i className="fab fa-github social-link"></i></a>
                            <a className="social-a" href="https://www.linkedin.com/in/anassri/"><i className="fab fa-linkedin social-link" ></i></a>
                        </div>
                    </div>
                    <div className="developer-container">
                        <p>Ivan Roth</p>
                        <div className="developer-links-container">
                            <a className="social-a" href="https://github.com/ivanhroth"><i className="fab fa-github social-link"></i></a>
                            <a className="social-a" href="https://www.linkedin.com/in/ivan-r-20971a190/"><i className="fab fa-linkedin social-link" ></i></a>
                        </div>
                    </div>
                    <div className="developer-container">
                        <p>Matt Ramotar</p>
                        <div className="developer-links-container">
                            <a className="social-a" href="https://github.com/matt-ramotar"><i className="fab fa-github social-link"></i></a>
                            <a className="social-a" href="https://www.linkedin.com/in/matt-ramotar/"><i className="fab fa-linkedin social-link" ></i></a>
                        </div>
                    </div>
                    <div className="developer-container">
                        <p>Sam Holt</p>
                        <div className="developer-links-container">
                            <a className="social-a" href="https://github.com/Cthulhuhub"><i className="fab fa-github social-link"></i></a>
                            <a className="social-a" href="https://www.linkedin.com/in/sam-holt-6a47a81bb/"><i className="fab fa-linkedin social-link" ></i></a>
                        </div>
                    </div>
                </div>
                <Typography variant="subtitle2" component="h2">
                    © 2020, All-A-Bot
                </Typography>
            </div>
        </div>
    )
}