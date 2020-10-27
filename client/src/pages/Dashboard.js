import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { loadBots } from '../store/bots';

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
    'margin-left': '25%',
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

export function Dashboard({ user, token, bots, loadBotsDispatch }) {
  const history = useHistory();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (user) loadBotsDispatch(user, token);
  }, user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteBot = event => {
    const regex = /\d+/;
    const id = event.target.id.match(regex)[0];
    console.log(id);
  };

  if (!bots) return null;

  return (
    <div className={classes.container}>
      <h1>DASHBOARD</h1>

      <div className={classes.root}>
        <AppBar
          position='static'
          style={{ backgroundColor: '#282828', 'border-top-left-radius': '5px', 'border-top-right-radius': '5px' }}>
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
            'border-bottom-left-radius': '5px',
            'border-bottom-right-radius': '5px',
          }}>
          <div>
            {bots
              .filter(bot => bot.is_draft === false)
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
                        <GetAppIcon style={{ margin: '2px' }} fontSize='medium' />
                        <EditIcon style={{ margin: '2px' }} fontSize='medium' />
                        <i onClick={deleteBot} id={`bot-${bot.id}`} className='fas fa-trash'></i>
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
            'border-bottom-left-radius': '5px',
            'border-bottom-right-radius': '5px',
          }}>
          <div>
            {bots
              .filter(bot => bot.is_draft === true)
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
                        <EditIcon style={{ margin: '2px' }} fontSize='medium' />
                        <i onClick={deleteBot} id={`bot-${bot.id}`} className='fas fa-trash'></i>
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
          index={2}
          style={{
            backgroundColor: '#282828',
            'border-bottom-left-radius': '5px',
            'border-bottom-right-radius': '5px',
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
                        <GetAppIcon style={{ margin: '2px' }} fontSize='medium' />
                        <FileCopyIcon style={{ margin: '2px' }} fontSize='medium' />
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

  return <Dashboard user={user} token={token} bots={bots} loadBotsDispatch={loadBotsDispatch} />;
}
