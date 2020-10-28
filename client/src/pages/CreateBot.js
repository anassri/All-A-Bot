import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBots } from '../store/bots';

export default function CreateBot(props) {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadAllBots())
    }, [])

    const allBots = useSelector(state => state.bots.explore) || [];
    let newId = null;
    console.log(allBots);
    let maxId = -1;
    for (let i=0; i<allBots.length; i++){
        if (maxId <= allBots[i].id) maxId = allBots[i].id + 1
    }
    newId = maxId + 1
    console.log(newId);

    if (newId > -1) props.history.push(`/edit-bot/${newId}`);

    return <h1>Loading...</h1>;

}
