import React, { Redirect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBots } from '../store/bots';

export default function CreateBot() {

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
    newId = maxId
    console.log(newId);

    return <>{(newId > -1) ? <Redirect to={`/edit-bot/${newId}`} /> : <h1>Loading...</h1>}</>;

}
