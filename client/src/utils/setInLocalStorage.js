import { TOKEN, USER } from '../constants';

export default function setInLocalStorage(token, user) {
  window.localStorage.setItem(TOKEN, token);
  window.localStorage.setItem(USER, JSON.stringify(user));
}
