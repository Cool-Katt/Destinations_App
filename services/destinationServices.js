import requester from './requestServices.js';
import {getUserData} from './authServices.js';

const databaseUrl = `https://test-19031.firebaseio.com`;

export const getAllDestinations = async (searchText) => {
    let res = await requester.get(`${databaseUrl}/destinations.json`);
    return Object.keys(res).map(key => ({key, ...res[key]})).filter(x => !searchText || searchText === x.creator);
};

export const getOneDestination = async (id) => {
    let res = await requester.get(`${databaseUrl}/destinations/${id}.json`);
    return Object.assign(res, {id});
};

export const addDestination = async (destinationData) => {
    let userId = getUserData().idToken;
    return await requester.post(`${databaseUrl}/destinations.json?auth=${userId}`, destinationData);
};

export const editDestination = async (id, destinationData) => {
    let userId = getUserData().idToken;
    return await requester.patch(`${databaseUrl}/destinations/${id}.json?auth=${userId}`, destinationData);
};

export const deleteDestination = async (id) => {
    let userId = getUserData().idToken;
    return await requester.delete(`${databaseUrl}/destinations/${id}.json?auth=${userId}`);
};