import { SET_BOTS, SET_ALL, SET_ONE } from '../constants';

export const setBots = bots => ({
  type: SET_BOTS,
  bots,
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
  const res = await fetch('/api/bots/all')
  if(res.ok) {
    const bots = await res.json();
    dispatch(setAll(bots.data));
  }
}
export const loadOne = (id) => async dispatch => {
  const res = await fetch(`/api/bots/${id}`)
  if(res.ok) {
    const bot = await res.json();
    dispatch(setOne(bot.data));
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

export default function botsReducer(state = {}, action) {
  switch (action.type) {
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
