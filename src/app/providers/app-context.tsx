import * as React from 'react';

var AppContext = React.createContext();
export default AppContext;

var defaultState = {
    page: '/',
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
    const [appState, dispatch] = React.useReducer(reducer, defaultState);

    function navigate(path) {
        dispatch({type: 'navigate', path});
    }

    var value = {
        appState,
        navigate,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
