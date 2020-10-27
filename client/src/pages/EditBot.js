import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Checkbox, Menu, MenuItem, FormLabel, Paper } from '@material-ui/core';
import { loadBot } from '../store/bots'

function EditBot({bot, botId, user}) {


    const BLANK_RULE = { prefix: "", content: { trigger: {type: "", usesPrefix: true, details: { string: "" }}, response: [{type: "", details: { string: "" }}] } };

    const [botName, setBotName] = useState("");
    const [rules, setRules] = useState([BLANK_RULE]);
    const [botPrefix, setBotPrefix] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [responseAnchor, setResponseAnchor] = useState(null);

    useEffect(() => {
        console.log(bot);
        console.log(bot.rules);
        console.log(rules);
        if (rules.length === 0 || bot.rules[0] && (rules[0] !== bot.rules[0])){
            setRules(bot.rules);
            console.log(rules);
        }
        if (botName === "") setBotName(bot.name);
        if (botPrefix !== bot.prefix) setBotPrefix(bot.prefix);
    })

    const addRule = () => {
        const newRule = BLANK_RULE;
        setRules([...rules, newRule]);
    }

    const saveBot = async () => {
        await fetch(`/api/bots/${botId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bot: { ...bot, name: botName, prefix: botPrefix, userId: user.id }, rules }),
        });
    }

    const setRule = (i, newRule) => {
        setRules([...rules.slice(0, i), newRule, ...rules.slice(i+1)]);
    }

    const RuleForm = ({i}) => {
        return (
        <>
            <h4>Rule:</h4>
            <form>
                <div>
                {/* this is the div which contains the trigger form. the next div down is the response form. */}
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
                        setRule(i, {...rules[i], content: { ...rules[i].content, trigger: {...rules[i].content.trigger, type: "message"} }})
                        // this is how we have to modify a rule - it's important to spread all of the intermediate nested objects into the new rule to make sure
                        // that nothing is being overwritten.
                        // we can't just modify the rule directly because it is part of the state.
                        // we follow this same pattern below when we are setting the string in the trigger details using the "trigger message" field.
                    }}>Message</MenuItem>

                </Menu>
                {rules[i].content.trigger.type === "message" ? <Box>
                    <TextField label="Trigger message: "
                               value={rules[i].content.trigger.details.string}
                               onChange={e => setRule(i, {...rules[i], content: {...rules[i].content, trigger: {...rules[i].content.trigger, details: { ...rules[i].content.trigger.details, string: e.target.value }}}})} />
                    </Box> : <></>}
                </div>


                <div>
                <Button onClick={e => setResponseAnchor(e.currentTarget)}>Response</Button>
                <Menu
                    keepMounted
                    anchorEl={responseAnchor}
                    open={Boolean(responseAnchor)}
                    label="On"
                    className="response-menu"
                    onClose={() => setResponseAnchor(null)}
                >
                    <MenuItem onClick={e => {
                        setRule(i, {...rules[i], content: { ...rules[i].content, response: [{...rules[i].content.response[0], type: "message"}] }})
                    }}>Message</MenuItem>

                </Menu>
                {rules[i].content.response[0].type === "message" ? <Box>
                    <TextField label="Response message: "
                               value={rules[i].content.response[0].details.string}
                               onChange={e => setRule(i, {...rules[i], content: {...rules[i].content, response: [{...rules[i].content.response[0], details: { ...rules[i].content.response[0].details, string: e.target.value }}]}})} />
                    </Box> : <></>}
                </div>
            </form>
        </>
    )}

    return (
        <Paper>
            <h1>Create your bot</h1>
            <Box>
                <form>
                    <TextField value={botName} onChange={e => setBotName(e.target.value)} label="Name"></TextField>
                    <TextField label="Prefix" value={botPrefix} onChange={e => setBotPrefix(e.target.value)}></TextField>
                    <Button onClick={addRule}>Add rule</Button>
                </form>
            </Box>
            {rules.map((rule, i) => <Box key={i}><RuleForm i={i} /></Box>)}
            <Button onClick={saveBot}>Save</Button>
        </Paper>
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
