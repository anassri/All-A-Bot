import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Checkbox, Menu, MenuItem, FormLabel } from '@material-ui/core';
import { loadBot } from '../store/bots'

export default function EditBot(props) {

    const botId = props.match.params.id;
    const dispatch = useDispatch();

    const bot = useSelector(state => state.bots.bot)

    useEffect(() => {
        if (bot.id !== botId) dispatch(loadBot(botId))
    }, []);

    const [botName, setBotName] = useState(bot.name);
    const [rules, setRules] = useState(bot.rules);

    const addRule = () => {
        const newRule = {};
        setRules([...rules, newRule]);
    }

    const saveBot = async () => {
        await fetch(`/api/bots/${botId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...bot, name: botName }),
        });
    }

    const RuleForm = (rule) => (
        <Box>
            <h4>Rule:</h4>
            <form>
                <Menu
                    keepMounted
                    anchorPosition="0"
                >
                    <MenuItem onClick={e => {
                        rule.trigger = "message"
                    }}>Message</MenuItem>
                </Menu>
                {rule.trigger === "message" ? <Box><TextField label="Trigger: "></TextField><TextField label="Response: "></TextField></Box> : <></>}
            </form>
        </Box>
    )

    return (
        <>
            <h1>Create your bot</h1>
            <Box>
                <form>
                    <TextField value={botName} onChange={e => setBotName(e.target.value)} label="Name"></TextField>
                    <Button onClick={addRule}>Add rule</Button>
                </form>
            </Box>
            {rules.map((rule, i) => <Box key={i}><RuleForm rule={rule} /></Box>)}
            <Button onClick={saveBot}>Save</Button>
        </>
    )
}
