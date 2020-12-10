const apiKey = 'AIzaSyB-35TflbLg9PfCsQ0AoihiIjf6zvW4WqM';

const endpoints = {
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    login:`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
};

import requester from './requestServices.js';

export const register = async (email, password) => {
    let res = await requester.post(endpoints.register, {
        email,
        password,
    });

    sessionStorage.setItem('auth', JSON.stringify(res));
    return res;
};

export const login = async (email, password) => {
    let res = await requester.post(endpoints.login, {
        email,
        password,
    });

    sessionStorage.setItem('auth', JSON.stringify(res));
    return res;
};

export const getUserData = () => {
    try {
        return JSON.parse(sessionStorage.getItem('auth'));
    } catch (error) {
        return null;
    }
};

export const logout = () => {
    sessionStorage.removeItem('auth')
}