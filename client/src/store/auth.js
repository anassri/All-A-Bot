import { REMOVE_AUTH, SET_USER, SET_TOKEN } from '../constants';
import { deleteFromLocalStorage, getFromLocalStorage, setInLocalStorage } from '../utils';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const removeAuth = () => ({ type: REMOVE_AUTH });

export const loadUser = () => async dispatch => {
  const { user, token } = getFromLocalStorage();

  if (!user || !token) return;

  const res = await fetch('/verify_token', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });

  // Res status will be 200 if token fresh or >400 if token revoked or expired
  if (res.ok) {
    dispatch(setUser);
    dispatch(setToken);
  } else {
    deleteFromLocalStorage();
    dispatch(removeAuth());
  }
};

export const signup = (username, email, password) => async dispatch => {
  try {
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    // TODO: Refactor
    if (res.ok) {
      const { token, user } = await res.json();
      setInLocalStorage(token, user);
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  } catch (e) {
    console.error(e);
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // TODO: Refactor
    if (res.ok) {
      const { token, user } = await res.json();
      setInLocalStorage(token, user);
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  } catch (e) {
    console.error(e);
  }
};

export const logout = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await fetch('/logout', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    deleteFromLocalStorage();
    dispatch(removeAuth());
  }
};

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case REMOVE_AUTH:
      return {};
    default:
      return state;
  }
}
