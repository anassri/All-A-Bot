import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Checkbox, Menu, MenuItem } from '@material-ui/core';
import { loadBot } from '../store/bots'

export default function EditBot(props) {

    const botId = props.match.params.id;
    const dispatch = useDispatch();
    dispatch(loadBot(botId));

    const bot = useSelector(state => state.bots.bot)

    const [botName, setBotName] = useState(bot.name);
    const [rules, setRules] = useState(bot.rules);

    const ruleForm = (rule) => (
        <Box>
            <form>
                <Menu
                    keepMounted
                >
                    <MenuItem onClick={e => {
                        rule.trigger = "message"
                    }}>Message</MenuItem>
                </Menu>
            </form>
        </Box>
    )

    return (
        <>
            <h1>Create your bot</h1>
            <Box>
                <form>
                    <TextField value={botName} onChange={e => setBotName(e.target.value)} label="Name"></TextField>
                </form>
            </Box>
            {bot.rules.forEach(rule => ruleForm(rule))}
        </>
    )
}
