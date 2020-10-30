import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCompleteBots } from '../store/bots';

export default function CreateBot(props) {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadCompleteBots())
    }, [])

    const allBots = useSelector(state => state.bots.completeBots) || null;
    if (allBots === null) {
        return <h1>Loading...</h1>;
    }
    let newId = null;
    let maxId = -1;
    for (let i=0; i<allBots.length; i++){
        if (maxId <= allBots[i].id) maxId = allBots[i].id + 1
    }
    newId = maxId + 1

    if (newId > -1) props.history.push(`/edit-bot/${newId}`);

    return <h1>Loading...</h1>;

}
