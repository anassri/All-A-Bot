import { SET_BOT, SET_BOTS, SET_ALL, SET_ONE } from '../constants';

const setBot = bot => ({
  type: SET_BOT,
  bot,
});
export const setAll = bots => ({
  type: SET_ALL,
  bots,
});
export const setOne = bot => ({
  type: SET_ONE,
  bot,
});

export const loadAllBots = () => async dispatch => {
  try {
    const res = await fetch('/api/bots/all')
    if(res.ok) {
      const bots = await res.json();
      dispatch(setAll(bots.data));
    }
  } catch(e) {
    console.error(e)
  }
}
export const loadOne = (id) => async dispatch => {
  try {
    const res = await fetch(`/api/bots/detail/${id}`)
    if(res.ok) {
      const bot = await res.json();
      dispatch(setOne(bot.data));
    }
  } catch(e) {
    console.error(e)
  }
};

export const setBots = bots => ({
  type: SET_BOTS,
  bots,
});


export const loadBot = id => async dispatch => {
  try {
    const res = await fetch(`/api/bots/${id}`);
    if (res.ok) {
      const bot = await res.json();
      bot.rules = bot.rules.map(rule => ({ ...rule, content: JSON.parse(rule.content) }));
      console.log(bot);
      dispatch(setBot(bot));
    }
  } catch (e) {
    console.error(e);
  }
};

export const deleteBot = (id, token) => async dispatch => {
  const res = await fetch(`/api/bots/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  if (res.ok) return true;
  else return false;
};

export const loadBots = (user, token) => async dispatch => {
  const res = await fetch('/api/bots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ user_id: user.id }),
  });

  if (res.ok) {
    const bots = await res.json();
    dispatch(setBots(bots));
  }
};

export default function botReducer (state={ bot: { name: "", rules: [] } }, action) {
    switch (action.type) {
        case SET_BOT:
            return { ...state, bot: action.bot };
        case SET_BOTS:
            return { ...state, list: action.bots };
        case SET_ALL:
            return { ...state, explore: action.bots };
        case SET_ONE:
            return { ...state, one: action.bot };
        default:
            return state;
        }
    }
