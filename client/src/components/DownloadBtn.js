import React, { useState } from 'react';

import { assembleFullFile } from '../utils/templateCreator';
import { fileDownload, packageDownload } from '../utils/fileSaver';

import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core';

export default function DownloadBtn({bot}){

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [developerToken, setDeveloperToken] = useState('');

    const handleOpenDialog = () => setDialogIsOpen(true);
    const handleCloseDialog = () => setDialogIsOpen(false);
    const updateDeveloperToken = e => setDeveloperToken(e.target.value);

    const handleDownload = () => async event => {
        const parsedRules = [];

        if (bot.rules) bot.rules.forEach(rule => parsedRules.push(JSON.parse(rule.content)));

        const file = assembleFullFile(bot.prefix, developerToken, parsedRules);

        fileDownload(file);
        packageDownload();
        handleCloseDialog();
    };
    return (
        <>
            <i onClick={handleOpenDialog} id={`bot-${bot.id}`} className='fas fa-download fa-lg' title='Download a Bot' style={{cursor: 'pointer', opacity: 0.7}}></i>
            <Dialog 
                open={dialogIsOpen} 
                onClose={handleCloseDialog} 
                maxWidth='sm' 
                fullWidth>
                <DialogTitle>Developer Token</DialogTitle>
                <DialogContent>
                <DialogContentText>Enter your bot token:</DialogContentText>
                <TextField
                    autoFocus
                    variant='outlined'
                    margin='dense'
                    style={{width:200}}
                    label='Token'
                    type='text'
                    onChange={updateDeveloperToken}
                />
                </DialogContent>
                <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseDialog}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleDownload(bot.id)} className={`bot`}>
                    Create my bot!
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}