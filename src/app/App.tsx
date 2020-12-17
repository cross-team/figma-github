import * as React from 'react';
import {createClient, Provider} from 'urql';
import Issues from './pages/issues';
import Tokens from './pages/tokens';
import AppContext from './providers/app-context';
import './styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const App = ({}) => {
    var {state} = React.useContext(AppContext);
    var renderPage;

    const githubClient = createClient({
        url: 'https://api.github.com/graphql',
        fetchOptions: () => {
            const token = 'token';
            return {
                headers: {authorization: token ? `Bearer ${token}` : ''},
            };
        },
    });

    const figmaClient = createClient({
        url: 'http://localhost:3000/graphql',
        fetchOptions: () => {
            const token = 'tokem';
            return {
                headers: {authorization: token ? `Bearer ${token}` : ''},
            };
        },
    });

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = event => {
            const {type, message} = event.data.pluginMessage;
            console.log(type, message);
        };
    }, []);

    // call launchControllerFunctions('message1') to launch the message1 command in src/plugin/controller.ts
    function launchControllerFunctions(messageType) {
        parent.postMessage({pluginMessage: {type: messageType}}, '*');
    }

    switch (state.page) {
        case '/issues':
            renderPage = <Issues />;
            break;
        case '/tokens':
            renderPage = <Tokens />;
            break;
        default:
            if (state.loggedIn) {
                renderPage = <Issues />;
            } else {
                renderPage = <Tokens />;
            }
            break;
    }

    if (state.loggedIn) {
        <Provider value={githubClient}>
            <Provider value={figmaClient}>
                <div className="root">{renderPage}</div>
            </Provider>
        </Provider>;
    } else {
        <div className="root">{renderPage}</div>;
    }

    return <div className="root">{renderPage}</div>;
};

export default App;
