import { getCookie, setCookie } from 'react-use-cookie';


const loginCookieName = 'ggFunTyping';

export function getLogin() {
    const str = getCookie(loginCookieName);
    if (str) {
        return JSON.parse(str);
    }
}

export function saveLogin(opt) {
    if (opt) {
        setCookie(loginCookieName, JSON.stringify(opt));
    }
}