import {User} from '../types';
import {ROLE} from '../constants';

export const getUser = ({token}: {token: string}): Promise<User> => {
    return new Promise(res => {
        setTimeout(() => {res(USERS[token])}, 300);
    });
};

const USERS: Record<string, User> = {
    'jvbnauibfuwi': {
        id: 0,
        name: 'Вася',
        role: ROLE.USER,
        login: 'sidorov',
    },
    'fvbjbnikjfieo': {
        id: 1,
        name: 'Петя',
        role: ROLE.ADMIN,
        login: 'petrov',
    },
};

export const getToken = ({login, password}: {login: string; password: string}): Promise<string> => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const user = TOKENS[login];
            if (!user || user.password !== password) {
                return rej('Пользователь не найден или неверный пароль');
            }
            res(user.token);
        }, 300);
    });
};

const TOKENS: Record<string, {token: string; password: string}> = {
    'sidorov': {
        token: 'jvbnauibfuwi',
        password: 'user',
    },
    'petrov': {
        token: 'fvbjbnikjfieo',
        password: 'admin',
    },
};