import { SET_BOT } from '../constants';


const setBot = bot => ({
    type: SET_BOT,
    bot,
});

export const loadBot = id => async dispatch => {
    try {
        const res = await fetch(`/api/bots/${id}`);
        if (res.ok) {
            console.log("Res was okay!")
            const bot = await res.json();
            setBot(bot);
        }
    } catch (e) {
        console.error(e);
    }
}

export default function botReducer (state={ bot: { name: "", rules: [] } }, action) {
    switch (action.type) {
        case SET_BOT:
            return { ...state, bot: action.bot };
        default:
            return state;
    }
}
