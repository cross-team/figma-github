import * as React from 'react';

var RouterContext = React.createContext();
export default RouterContext;

var initialState = {
    page: '/',
    loggedIn: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'navigate':
            return {...state, page: action.path};
        default:
            throw new Error();
    }
}

export function RouterController({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    function navigate(path) {
        dispatch({type: 'navigate', path});
    }

    var value = {
        state,
        navigate,
    };

    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
