import * as React from 'react';

var FigmaContext = React.createContext();
export default FigmaContext;

const API_URL = 'http://localhost:3000/figma';

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

export function FigmaController({children}) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    function authHeader(token = state.token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    function login() {
        fetch(API_URL, authHeader()).then(response => {
            if (response.ok) {
                dispatch({type: 'login'});
                parent.postMessage({pluginMessage: {type: 'setFigToken', value: state.token}}, '*');
            } else {
                console.log(response);
                didError(response.status, response.statusText);
                logout();
            }
        });
    }

    function didError(status, statusText) {
        console.log(status, statusText);
    }

    function logout() {
        dispatch({type: 'logout'});
        parent.postMessage({pluginMessage: {type: 'setFigToken', value: undefined}}, '*');
    }

    function setToken(token) {
        dispatch({type: 'setToken', token});
    }

    function setTokenAndLogin(token) {
        dispatch({type: 'setToken', token});
        fetch(API_URL, authHeader(token)).then(response => {
            if (response.ok) {
                dispatch({type: 'login'});
            } else {
                didError(response.status, response.statusText);
            }
        });
    }

    // Queries

    var value = {
        state,
        setToken,
        setTokenAndLogin,
        logout,
        login,
    };

    return <FigmaContext.Provider value={value}>{children}</FigmaContext.Provider>;
}
