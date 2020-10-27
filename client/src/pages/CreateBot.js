import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default CreateBot = props => {

    const dispatch = useDispatch();

    const allBots = useSelector(state => state.bots.explore)

    return "";

}
