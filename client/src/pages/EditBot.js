import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Checkbox, Menu, MenuItem, FormLabel } from '@material-ui/core';
import { loadBot } from '../store/bots'

function EditBot({bot, botId, user}) {

    const BLANK_RULE = { name: "", prefix: "", content: { trigger: {}, response: [{}] } };

    const [botName, setBotName] = useState("");
    const [rules, setRules] = useState([BLANK_RULE]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (botName === "") setBotName(bot.name);
        if (rules === [BLANK_RULE]) setRules(bot.rules);
    })

    const addRule = () => {
        const newRule = BLANK_RULE;
        setRules([...rules, newRule]);
    }

    const saveBot = async () => {
        await fetch(`/api/bots/${botId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bot: { ...bot, name: botName, userId: user.id }, rules }),
        });
    }

    const setRule = (i, newRule) => {
        setRules([...rules.slice(0, i), newRule, ...rules.slice(i+1)]);
    }

    const RuleForm = ({i}) => {
        return (
        <Box>
            <h4>Rule:</h4>
            <form>
                <TextField label="Prefix" value={rules[i].prefix} onChange={e => setRule(i, {...rules[i], prefix: e.target.value})}></TextField>
                <div>
                <Button onClick={e => setAnchorEl(e.currentTarget)}>Trigger</Button>
                <Menu
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    label="On"
                    className="trigger-menu"
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={e => {
                        rules[i].content.trigger = "message";
                    }}>Message</MenuItem>
                </Menu>
                </div>
                {rules[i].content.trigger === "message" ? <Box><TextField label="Trigger: "></TextField><TextField label="Response: "></TextField></Box> : <></>}
            </form>
        </Box>
    )}

    return (
        <>
            <h1>Create your bot</h1>
            <Box>
                <form>
                    <TextField value={botName} onChange={e => setBotName(e.target.value)} label="Name"></TextField>
                    <Button onClick={addRule}>Add rule</Button>
                </form>
            </Box>
            {rules.map((rule, i) => <Box key={i}><RuleForm i={i} /></Box>)}
            <Button onClick={saveBot}>Save</Button>
        </>
    )
}

export default function EditBotContainer(props) {
    const dispatch = useDispatch();

    const bot = useSelector(state => state.bots.bot);
    const user = useSelector(state => state.auth.user);

    const botId = props.match.params.id;

    useEffect(() => {
        if (bot.id !== botId) dispatch(loadBot(botId))
    }, []);

    return (<EditBot bot={bot} user={user} botId={botId} />);

}
