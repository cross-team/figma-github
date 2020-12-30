import * as React from 'react';

var GithubContext = React.createContext();
export default GithubContext;

const API_URL = 'http://localhost:3000/github';

const defaultState = {
    client: {},
    token: '',
    isLoggedIn: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'setToken':
            return {...state, token: action.token};
        case 'logout':
            return {...defaultState};
        case 'login':
            return {...state, isLoggedIn: true};
        default:
            throw new Error();
    }
}

export function GithubController({children}) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    function authHeader(token = state.token, method = 'GET') {
        return {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    function login() {
        return fetch(`${API_URL}/login`, authHeader(state.token, 'POST')).then(response => {
            if (response.ok) {
                dispatch({type: 'login'});
                parent.postMessage({pluginMessage: {type: 'setGHToken', value: state.token}}, '*');
            } else {
                didError(response.status, response.statusText);
                logout();
            }
            return response;
        });
    }

    function didError(status, statusText) {
        console.log(status, statusText);
    }

    function logout() {
        dispatch({type: 'logout'});
        parent.postMessage({pluginMessage: {type: 'setGHToken', value: undefined}}, '*');
    }

    function setToken(token) {
        dispatch({type: 'setToken', token});
    }

    function setTokenAndLogin(token) {
        dispatch({type: 'setToken', token});
        fetch(`${API_URL}/login`, authHeader(token, 'POST')).then(response => {
            console.log('This is the response', response);
            if (response.ok) {
                dispatch({type: 'login'});
            } else {
                didError(response.status, response.statusText);
            }
        });
    }

    // Queries

    async function getIssues() {
        let issues = await fetch(`${API_URL}/issues`, authHeader())
            .then(response => response.json())
            .then(data => {
                return data;
            });
        return issues;
    }

    var value = {
        state,
        setToken,
        setTokenAndLogin,
        logout,
        login,
        getIssues,
    };

    return <GithubContext.Provider value={value}>{children}</GithubContext.Provider>;
}
