import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useConfirm } from 'material-ui-confirm';
import { CardActionArea } from '@material-ui/core';
import { loadBots, deleteBot } from '../store/bots';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '66.67%',
    borderRadius: '10px',
  },
}));

export function Dashboard({ user, token, bots, loadBotsDispatch, deleteBotDispatch }) {
  const history = useHistory();
  const confirm = useConfirm();

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [botSyncNeeded, setBotSyncNeeded] = useState(false);

  useEffect(() => {
    if (user) loadBotsDispatch(user, token);
  }, [user, botSyncNeeded]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async event => {
    const id = event.target.id.match(/\d+/)[0];
    try {
      await confirm({ description: 'This operation cannot be undone', dialogProps: { maxWidth: 'sm' } });
      await deleteBotDispatch(id, token);
      setBotSyncNeeded(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = event => {
    const botId = event.target.id.match(/\d+/)[0];
  };

  const handleDownload = event => {};

  const handleClone = event => {};

  if (!bots) return null;

  return (
    <div className={classes.container}>
      <h1>DASHBOARD</h1>

      <div className={classes.root}>
        <AppBar
          position='static'
          style={{ backgroundColor: '#282828', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
          <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
            <Tab label='Bots' {...a11yProps(0)} />
            <Tab label='Drafts' {...a11yProps(1)} />
            <Tab label='Bookmarked' {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel
          value={value}
          index={0}
          style={{
            backgroundColor: '#282828',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          }}>
          <div>
            {bots
              .filter(bot => bot.is_draft === false)
              .map(bot => {
                return (
                  <>
                    <CardActionArea key={bot.id}>
                      <Link key={bot.id} to={`/bots/${bot.id}`} style={{ color: 'inherit' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                            {bot.name}
                          </Typography>
                        </div>
                      </Link>
                    </CardActionArea>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='body2'>{bot.description}</Typography>
                      <div>
                        <CardActionArea>
                          <Link to={''} style={{ color: 'inherit' }} title='Download Bot'>
                            <i onClick={handleDownload} id={`bot-${bot.id}`} className='fas fa-download'></i>
                          </Link>
                          <Link to={`edit-bot/${bot.id}`} style={{ color: 'inherit' }} title='Edit Bot'>
                            <i onClick={handleEdit} id={`bot-${bot.id}`} className='fas fa-edit'></i>
                          </Link>
                          <Link style={{ color: 'inherit' }} title='Delete Bot'>
                            <i onClick={handleDelete} id={`bot-${bot.id}`} className='fas fa-trash'></i>
                          </Link>
                        </CardActionArea>
                      </div>
                    </div>
                    <Divider />
                  </>
                );
              })}
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          style={{
            backgroundColor: '#282828',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          }}>
          <div>
            {bots
              .filter(bot => bot.is_draft === true)
              .map(bot => {
                return (
                  <div key={bot.id}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        {bot.name}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='body2'>{bot.description}</Typography>
                      <div>
                        <Link to={`edit-bot/${bot.id}`} style={{ color: 'inherit' }} title='Edit Bot'>
                          <i onClick={handleEdit} id={`bot-${bot.id}`} className='fas fa-edit'></i>
                        </Link>
                        <Link style={{ color: 'inherit' }} title='Delete Bot'>
                          <i onClick={handleDelete} id={`bot-${bot.id}`} className='fas fa-trash'></i>
                        </Link>
                      </div>
                    </div>
                    <Divider />
                  </div>
                );
              })}
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          style={{
            backgroundColor: '#282828',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          }}>
          <div>
            {bots
              .filter(bot => bot.user_id === user.id)
              .map(bot => {
                return (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        {bot.name}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='body2'>{bot.description}</Typography>
                      <div>
                        <Link to={''} style={{ color: 'inherit' }} title='Download Bot'>
                          <i onClick={handleDownload} id={`bot-${bot.id}`} className='fas fa-download'></i>
                        </Link>
                        <Link style={{ color: 'inherit' }} title='Clone Bot'>
                          <i onClick={handleClone} id={`bot-${bot.id}`} className='fas fa-clone'></i>
                        </Link>
                      </div>
                    </div>
                    <Divider />
                  </>
                );
              })}
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

export default function DashboardContainer() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const bots = useSelector(state => state.bots.list);
  const loadBotsDispatch = (userId, token) => dispatch(loadBots(userId, token));
  const deleteBotDispatch = (botId, token) => dispatch(deleteBot(botId, token));

  return (
    <Dashboard
      user={user}
      token={token}
      bots={bots}
      loadBotsDispatch={loadBotsDispatch}
      deleteBotDispatch={deleteBotDispatch}
    />
  );
}
