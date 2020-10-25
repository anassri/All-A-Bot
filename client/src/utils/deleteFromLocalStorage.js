import { TOKEN, USER } from '../constants';

export default function deleteFromLocalStorage() {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);
}
