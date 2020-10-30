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
  Box,
  makeStyles,
  Popover,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { loadAllBots, bookmarkBot, loadBookmarks } from '../store/bots';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';

import '../style/explore.css';
import DownloadBtn from '../components/DownloadBtn';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    height: '60%',
    minHeight: '60vh',
    padding: '55px 65px',
  },
  popover: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bots: {
    textAlign: 'left',
    overflowY: 'auto',
    overflowX: 'hidden',
    // scrollBar: "rgba(232,232,232,1)",
    width: '100%',
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
    
  },
}));
const ListItem = ({
  id,
  bot,
  token,
  name,
  description,
  username,
  user,
  bookmarkBotDispatch,
  loadBookmarksDispatch,
}) => {
  const classes = useStyle();

  useEffect(() => {
    if (user) loadBookmarksDispatch(user.id, token);
  }, user);

  const bookmarks = useSelector(state => state.bots.bookmarks);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = event => {
    setPopoverIsOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => setPopoverIsOpen(false);

  const handleShare = () => {};

  const handleBookmark = () => async event => {
    bookmarkBotDispatch(bot.id, user.id, token);
    loadBookmarksDispatch(user.id, token);
  };

  return (
    <Grid key={id} item xs={12} className={classes.bot}>
      <i
        onClick={handleBookmark(bot.id)}
        className={
          bookmarks ? (bookmarks.some(b => b.id === bot.id) ? 'fas fa-bookmark fa-2x' : 'far fa-bookmark fa-2x') : ''
        }></i>
      <CardActionArea className={classes.action}>
        <div className={classes.content}></div>
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
          <DownloadBtn bot={bot} />
        </div>
        <i onClick={handleBookmark(bot.id)} title='Bookmark a Bot' className='fas fa-bookmark fa-lg' style={{ cursor: 'pointer', opacity: 0.7, }}></i>
        <i onClick={handleOpenPopover} title='Share a Bot' className='fas fa-share-alt fa-lg' style={{ cursor: 'pointer', opacity: 0.7, }}/>
        <Popover
          open={popoverIsOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          anchorPosition={{ top: 10, right: 50 }}
          onClose={handleClosePopover}
          PaperProps={{ classes: { root: classes.popover } }}>
          <div>
            <EmailShareButton url={`http://localhost:3000/bots/${id}`}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={`http://localhost:3000/bots/${id}`}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={`http://localhost:3000/bots/${id}`}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={`http://localhost:3000/bots/${id}`}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>

            <RedditShareButton url={`http://localhost:3000/bots/${id}`}>
              <RedditIcon size={32} round={true} bgStyle={{ fill: '#F94503' }} />
            </RedditShareButton>
          </div>
        </Popover>
      </div>
    </Grid>
  );
};

export function Explore({ bots, user, token, bookmarkBotDispatch, loadBookmarksDispatch }) {
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
            <div style={{ marginBottom: 20 }}>
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
            <Grid className={classes.bots}>
              {botsMatchingQuery.map(bot => (
                <Box><ListItem
                  name={bot.name}
                  key={bot.id}
                  id={bot.id}
                  bot={bot}
                  description={bot.description}
                  username={bot.owner.username}
                  user={user}
                  bookmarkBotDispatch={bookmarkBotDispatch}
                  loadBookmarksDispatch={loadBookmarksDispatch}
                  token={token}
                  style={{ textAlign: 'left' }}
                /></Box>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default function ExploreContainer() {
  const bots = useSelector(state => state.bots.explore);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const bookmarkBotDispatch = (botId, userId, token) => dispatch(bookmarkBot(botId, userId, token));
  const loadBookmarksDispatch = (userId, token) => dispatch(loadBookmarks(userId, token));

  useEffect(() => {
    dispatch(loadAllBots());
  }, []);

  if (!bots) return null;

  return (
    <Explore
      bots={bots}
      user={user}
      token={token}
      bookmarkBotDispatch={bookmarkBotDispatch}
      loadBookmarksDispatch={loadBookmarksDispatch}
    />
  );
}
