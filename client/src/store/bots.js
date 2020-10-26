import { SET_BOT } from '../constants';
import { SET_BOTS } from '../constants';


const setBot = bot => ({
    type: SET_BOT,
    bot,
});

export const setBots = bots => ({
    type: SET_BOTS,
    bots,
  });


export const loadBot = id => async dispatch => {
    try {
        const res = await fetch(`/api/bots/${id}`);
        if (res.ok) {
            const bot = await res.json();
            dispatch(setBot(bot));
        }
    } catch (e) {
        console.error(e);
    }
}

export const loadBots = (user, token) => async dispatch => {
    const res = await fetch('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (res.ok) {
      const bots = await res.json();
      dispatch(setBots(bots.data));
    }
  };

export default function botReducer (state={ bot: { name: "", rules: [] } }, action) {
    switch (action.type) {
        case SET_BOT:
            return { ...state, bot: action.bot };
        case SET_BOTS:
            return { ...state, list: action.bots };
        default:
            return state;
    }
}
