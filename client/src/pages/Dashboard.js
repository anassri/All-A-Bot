import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Dashboard({ user, token, bots, loadBotsDispatch }) {
  const history = useHistory();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (user) loadBotsDispatch(user, token);
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!bots) return null;

  return (
    <div>
      <h1>DASHBOARD</h1>

      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
            <Tab label='Bots' {...a11yProps(0)} />
            <Tab label='Drafts' {...a11yProps(1)} />
            <Tab label='Bookmarked' {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            // TODO: Update filter for draft status
            {bots
              .filter(bot => bot.name === 'bot1')
              .map(bot => {
                return <h2>{bot.name}</h2>;
              })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            // TODO: Update filter for draft status
            {bots
              .filter(bot => bot.name.includes('bot'))
              .map(bot => {
                return <h2>{bot.name}</h2>;
              })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            // TODO: Update filter for bots owned by other user
            {bots
              .filter(bot => bot.name === 'bot1')
              .map(bot => {
                return <h2>{bot.name}</h2>;
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
