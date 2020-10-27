import { SET_BOT } from '../constants';
import { SET_BOTS, LOAD_ALL } from '../constants';


const setBot = bot => ({
    type: SET_BOT,
    bot,
});
export const loadAll = bots => ({
  type: LOAD_ALL,
  bots,
});

export const loadAllBots = () => async dispatch => {
  const res = await fetch('/api/bots/all')
  if(res.ok) {
    const bots = await res.json();
    dispatch(loadAll(bots.data));
  }
}

export const setBots = bots => ({
    type: SET_BOTS,
    bots,
  });

<<<<<<< HEAD
export const loadBot = id => async dispatch => {
    try {
        const res = await fetch(`/api/bots/${id}`);
        if (res.ok) {
            const bot = await res.json();
            bot.rules = bot.rules.map(rule => ({...rule, content: JSON.parse(rule.content)}));
            console.log(bot.rules);
            dispatch(setBot(bot));
        }
    } catch (e) {
        console.error(e);
    }
=======
  if (res.ok) {
    const bots = await res.json();
    dispatch(setBots(bots));
  }
};

export default function botsReducer(state = {}, action) {
  switch (action.type) {
    case SET_BOTS:
      return { ...state, list: action.bots };
    case LOAD_ALL:
      return { ...state, explore: action.bots };
    default:
      return state;
  }
>>>>>>> master
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
        case LOAD_ALL:
            return { ...state, explore: action.bots };
        default:
            return state;
        }
    }
