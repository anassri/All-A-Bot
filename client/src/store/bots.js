import { SET_BOTS, LOAD_ALL } from '../constants';

export const setBots = bots => ({
  type: SET_BOTS,
  bots,
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

export default function botsReducer(state = {}, action) {
  switch (action.type) {
    case SET_BOTS:
      return { ...state, list: action.bots };
    case LOAD_ALL:
      return { ...state, explore: action.bots };
    default:
      return state;
  }
}
