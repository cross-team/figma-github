import * as React from 'react';

var AppContext = React.createContext();
export default AppContext;

var initialState = {
    page: '/',
    loggedIn: false,
    figmaAccessCode: '',
    githubAccessCode: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'navigate':
            return {...state, page: action.path};
        default:
            throw new Error();
    }
}

export function AppController({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    function navigate(path) {
        dispatch({type: 'navigate', path});
    }

    var value = {
        state,
        navigate,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
