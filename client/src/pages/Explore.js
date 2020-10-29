import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  InputAdornment,
  CardActionArea,
  Typography,
  Container,
  Paper,
  Grid,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { loadAllBots } from '../store/bots';
import '../style/explore.css';

import { assembleFullFile } from '../utils/templateCreator';
import { fileDownload, packageDownload } from '../utils/fileSaver';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    height: '60vh',
    padding: '55px 65px',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bots: {
    textAlign: 'left',
  },
  bot: {
    display: 'flex',
    borderBottom: '1px solid rgba(232,232,232,0.3)',
  },
  action: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5,
    paddingLeft: 20,
    opacity: 0.7,
  },
}));
const ListItem = ({ id, bot, name, description, username }) => {
  const classes = useStyle();

  const [isOpen, setIsOpen] = useState(false);
  const [developerToken, setDeveloperToken] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const updateDeveloperToken = e => setDeveloperToken(e.target.value);

  const handleDownload = () => async event => {
    const parsedRules = [];

    if (bot.rules) bot.rules.forEach(rule => parsedRules.push(JSON.parse(rule.content)));

    const file = assembleFullFile(bot.prefix, developerToken, parsedRules);

    fileDownload(file);
    packageDownload();
    handleClose();
  };

  return (
    <Grid key={id} item xs={12} className={classes.bot}>
      <CardActionArea className={classes.action}>
        <Link to={`/bots/${id}`} style={{ color: 'inherit' }}>
          <Typography variant='h5' component='h2' style={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant='subtitle1' component='h2'>
            <div>
              {description}. By <span style={{ fontWeight: 'bold' }}>{username}</span>
            </div>
          </Typography>
        </Link>
      </CardActionArea>
      <div className={classes.content}>
        <div>
          <i onClick={handleOpen} id={`bot-${bot.id}`} className='fas fa-download'></i>
          <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Developer Token</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter your bot token:</DialogContentText>
            </DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Developer Token'
              type='text'
              fullWidth
              onChange={updateDeveloperToken}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDownload(bot.id)} className={`bot`}>
                Create my bot!
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Link key={id} to={``} style={{ color: 'inherit' }} title='Clone Bot'>
          <i className='fas fa-clone fa-lg'></i>
        </Link>
      </div>
    </Grid>
  );
};

export function Explore({ bots }) {
  const classes = useStyle();
  const [botsMatchingQuery, setBotsMatchingQuery] = useState([...bots]);

  const handleSearch = event => {
    const query = event.target.value;

    const matches = bots.filter(
      bot =>
        bot.name.toLowerCase().includes(query.toLowerCase()) ||
        bot.description.toLowerCase().includes(query.toLowerCase())
    );

    setBotsMatchingQuery([...matches]);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth='lg' className='paper-container'>
        <div className='about-container'>
          <Typography variant='h4' component='h2' style={{ fontWeight: 'bold' }}>
            ABOUT ALL-A-BOT
          </Typography>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id vehicula ante, et vulputate lacus. Cras
            fringilla dui at convallis varius. Nunc non condimentum mi. Sed dapibus, erat at pretium luctus, est odio
            mattis nisl, quis imperdiet urna nunc nec nisi. Quisque eu arcu nulla. Suspendisse non congue justo, id
            gravida lorem. Phasellus at justo lorem.
          </p>
        </div>
        <Paper className={classes.paper}>
          <Grid container spacing={3} style={{ flexDirection: 'column' }}>
            <Typography variant='h4' component='h2' className={classes.title}>
              RECENT BOTS
            </Typography>
            <div>
              <TextField
                placeholder='Search...'
                onChange={handleSearch}
                size='medium'
                variant='filled'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}></TextField>
            </div>
            <div className={classes.bots}>
              {botsMatchingQuery.map(bot => (
                <ListItem
                  name={bot.name}
                  key={bot.id}
                  id={bot.id}
                  bot={bot}
                  description={bot.description}
                  username={bot.owner.username}
                  style={{ textAlign: 'left' }}
                />
              ))}
            </div>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default function ExploreContainer() {
  const bots = useSelector(state => state.bots.explore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllBots());
  }, []);

  if (!bots) return null;

  return <Explore bots={bots} />;
}
