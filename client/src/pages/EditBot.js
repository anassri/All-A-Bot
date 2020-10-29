import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Divider, Paper, RadioGroup, Radio, FormControlLabel, Checkbox } from '@material-ui/core';
import { loadBot } from '../store/bots'
import { loadUser } from '../store/auth';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        boxSizing: 'border-box'

    },
    paper: {
        height: '60vh',
        padding: '55px 65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'left',
        margin: '15px 0',
    },
    label: {
        textAlign: 'left',
        color: "rgba(232,232,232,0.7)",
        paddingTop: 15,
        // marginBottom: 10
    },
    content: {
        textAlign: 'left',
        color: "rgba(232,232,232,1)",
        fontWeight: 'bold',
        paddingTop: 10,
    },
    grid: {
        // maxWidth: '10%'
    },
    icons: {
        textAlign: 'right',
        opacity: 0.7
    },
    formControl: {
        minWidth: '100%',
    },
    gridOverflow: {
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        paddingTop: '10px'
    }
}));

function EditBot({bot, botId, user, history}) {

    const BLANK_RESPONSE = {type: "", details: { string: "" }}
    const BLANK_RULE = { prefix: "", content: { trigger: {type: "", usesPrefix: true, details: { string: "", includesOrBeginsWith: "begins with" }}, response: [BLANK_RESPONSE] } };

    const [botName, setBotName] = useState("");
    const [rules, setRules] = useState([]);
    const [botPrefix, setBotPrefix] = useState("");
    const [botDescription, setBotDescription] = useState("");
    const [isDraft, setIsDraft] = useState(true);
    const [autoSaveMsg, setAutoSaveMsg] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const classes = useStyle();

    if (!user || bot && bot.userId !== user.id) history.push('/login');

    useEffect(() => {
        if (rules.length === 0){
            setRules(bot.rules);
        }
        if (botName === "") setBotName(bot.name);
        if (botPrefix === "") setBotPrefix(bot.prefix);
    })

    const addRule = () => {
        const newRule = BLANK_RULE;
        setRules([...rules, newRule]);
    }

    const saveBot = async () => {
        console.log(botPrefix);
        console.log(user);
        await fetch(`/api/bots/${botId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bot: { ...bot, name: botName, prefix: (botPrefix || null), userId: user.id, isDraft: isDraft }, rules }),
        });
    }

    const autoSave = () =>{
        if (!isSaving){
            setIsSaving(true);
            setIsDraft(true);
            setTimeout(async ()=>{
                await saveBot();
                setIsSaving(false);
                setAutoSaveMsg("Draft bot saved.");
                setTimeout(()=>{setAutoSaveMsg("")}, 5000);
            },20000);
        }
    }
    const setRule = (i, newRule) => {
        setRules([...rules.slice(0, i), newRule, ...rules.slice(i+1)]);
    }

    const setTrigger = (i, newTrigger) => {
        setRule(i, {...rules[i], content: {...rules[i].content, trigger: newTrigger } })
    }

    const setResponse = (ruleIndex, responseIndex, newResponse) => {
        setRule(ruleIndex, {...rules[ruleIndex], content: {...rules[ruleIndex].content, response: [...rules[ruleIndex].content.response.slice(0, responseIndex), newResponse, ...rules[ruleIndex].content.response.slice(responseIndex+1)] }})
    }

    const RuleForm = ({i}) => {
        return (
        <>
            <form>
                <div>
                {/* this is the div which contains the trigger form. the next div down is the response form. */}
                    <Grid container spacing={3}>
                        <Grid item xs={2} sm={1} className={classes.grid}>
                            <Typography variant="subtitle2" component="h2" className={classes.label}>
                                Rule:
                            </Typography>
                        </Grid>
                        <Grid item xs className={classes.grid}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="trigger-select-input-label">Select a Trigger</InputLabel>
                                <Select
                                    labelId="trigger-select-label"
                                    id="trigger-select"
                                    variant="outlined"
                                    value={rules[i].content.trigger.type}
                                    fullWidth
                                        onChange={(e) => { setTrigger(i, {...rules[i].content.trigger, type: e.target.value}); autoSave(); }}
                                    label="Select a Trigger"
                                >
                                    <MenuItem value="message">Message</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs className={classes.grid}>
                            {rules[i].content.trigger.type === "message"
                                ? <>
                                <TextField
                                        variant="outlined"
                                        fullWidth
                                        value={rules[i].content.trigger.details.string}
                                        label={`message ${rules[i].content.trigger.details.includesOrBeginsWith} string...`}
                                        onChange={e => setTrigger(i, {...rules[i].content.trigger, details: { ...rules[i].content.trigger.details, string: e.target.value }})} />
                                  <FormControl>
                                        <RadioGroup value={rules[i].content.trigger.details.includesOrBeginsWith}
                                            onChange={e => setTrigger(i, {...rules[i].content.trigger, details: { ...rules[i].content.trigger.details, includesOrBeginsWith: e.target.value }})}
                                >
                                    <FormControlLabel value="includes" control={<Radio />} label="Includes" />
                                    <FormControlLabel value="begins with" control={<Radio />} label="Begins with" />
                                </RadioGroup>
                                <FormControlLabel label="Uses prefix" control={<Checkbox checked={rules[i].content.trigger.usesPrefix}
                                           onChange={e => setTrigger(i, {...rules[i].content.trigger, usesPrefix: e.target.checked})} />}>Uses prefix</FormControlLabel>
                                </FormControl>
                                </>
                                : <></>
                            }
                        </Grid>
                    </Grid>
                </div>
                {rules[i].content.response.map((resp, responseIndex) => <ResponseForm ruleIndex={i} responseIndex={responseIndex} />)}
                <Button onClick={() => addResponse(i)}>Add response</Button>
            </form>
        </>
    )}

    const addResponse = i => {
        console.log(rules[i].content.response.length);
        let newResponses = rules[i].content.response;
        newResponses.push(BLANK_RESPONSE);
        setRule(i, {...rules[i], content: { ...rules[i].content, response: newResponses }});
        console.log(rules[i].content.response.length);
    }

    const ResponseForm = ({ruleIndex, responseIndex}) => {
        return (<div>
            <Grid container spacing={3}>
                <Grid item xs className={classes.grid}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="response-select-input-label">Select a Response</InputLabel>
                        <Select
                            labelId="response-select-label"
                            id="response-select"
                            variant="outlined"
                            value={rules[ruleIndex].content.response[responseIndex].type}
                            fullWidth
                            onChange={(e) => { setResponse(ruleIndex, responseIndex, {...rules[ruleIndex].content.response[responseIndex], type: e.target.value}); autoSave(); }}
                            label="Select a Response"
                        >
                            <MenuItem value="message">Message</MenuItem>
                            <MenuItem value="emoji">Emoji react to triggering message</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs className={classes.grid}>
                    {["message", "emoji"].includes(rules[ruleIndex].content.response[responseIndex].type)
                        ? <TextField
                        variant="outlined"
                        fullWidth
                        value={rules[ruleIndex].content.response[responseIndex].details.string}
                        label={rules[ruleIndex].content.response[responseIndex].type === "message" ? "message string" : "emoji name"}
                        onChange={e => { setResponse(ruleIndex, responseIndex, {...rules[ruleIndex].content.response[responseIndex], details: { ...rules[ruleIndex].content.response[responseIndex].details, string: e.target.value }}); autoSave(); }} />
                        : <></>}
                </Grid>
            </Grid>
        </div>)
    }

    return (
        <Container className={`${classes.container} paper-container`}>
            <Typography variant="h4" component="h2" className={classes.title}>
                {bot.name ? "EDIT " + bot.name.toUpperCase() : "CREATE A BOT "}
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs className={classes.grid}>
                        <TextField variant="outlined" fullWidth value={botName} onChange={e => { setBotName(e.target.value); autoSave();}} label="Name"></TextField>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <TextField variant="outlined" fullWidth label="Prefix" value={botPrefix} onChange={e => {setBotPrefix(e.target.value); autoSave();}}></TextField>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <TextField variant="outlined" fullWidth label="Developer Token" value={botPrefix} onChange={e => { setBotPrefix(e.target.value); autoSave(); }}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                        <TextField variant="outlined" fullWidth label="Description" value={botDescription} onChange={e => { setBotDescription(e.target.value); autoSave(); }}></TextField>
                    </Grid>
                </Grid>
                <Divider />

                <Grid className={classes.gridOverflow}>
                {rules.map((rule, i) => <Box key={i}><RuleForm i={i} /></Box>)}
                <Button onClick={addRule} >Add rule</Button>
                </Grid>

                <Grid container spacing={3} justify="flex-end" style={{paddingRight: 35}}>
                    {autoSaveMsg
                    ?   <Grid item xs>
                            <Alert variant="outlined" severity="success">
                                {autoSaveMsg}
                            </Alert>
                        </Grid>
                    : null
                    }
                    <Grid item xs={3} sm={1}>
                        <Button onClick={saveBot} size="medium" variant="contained" color="primary">Save</Button>
                    </Grid>
                    <Grid item xs={3} sm={1} >
                        <Button onClick={()=> { saveBot();
                                                setIsDraft(false);
                                            }}
                                size="medium"
                                variant="contained"
                                color="primary">{bot.name ? "SUBMIT CHANGES" : "CREATE"}</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>

    )
}

export default function EditBotContainer(props) {
    const dispatch = useDispatch();

    const bot = useSelector(state => state.bots.bot);
    const user = useSelector(state => state.auth.user);

    const botId = props.match.params.id;

    useEffect(() => {
        if (bot.id !== botId) dispatch(loadBot(botId))
        if (!user) dispatch(loadUser())
    }, []);

    return (<EditBot bot={bot} user={user} botId={botId} history={props.history} />);

}
