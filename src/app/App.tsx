import * as React from 'react';
import Issues from './pages/issues';
import Tokens from './pages/tokens';
import AppContext from './providers/app-context';
import FigmaContext from './providers/figma-context';
import GithubContext from './providers/github-context';
import './styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const App = ({}) => {
    var {appState} = React.useContext(AppContext);
    var githubContext = React.useContext(GithubContext);
    var figmaContext = React.useContext(FigmaContext);
    var renderPage;

    React.useEffect(() => {
        parent.postMessage({pluginMessage: {type: 'getTokens'}}, '*');
    }, []);

    onmessage = event => {
        if (event.data.pluginMessage.githubToken !== undefined) {
            githubContext.setTokenAndLogin(event.data.pluginMessage.githubToken);
        }
    };

    // call launchControllerFunctions('message1') to launch the message1 command in src/plugin/controller.ts
    // function launchControllerFunctions(messageType) {
    //     parent.postMessage({pluginMessage: {type: messageType}}, '*');
    // }

    switch (appState.page) {
        case '/issues':
            renderPage = <Issues />;
            break;
        case '/tokens':
            renderPage = <Tokens />;
            break;
        default:
            if (githubContext.state.isLoggedIn && figmaContext.state.isLoggedIn) {
                renderPage = <Issues />;
            } else {
                renderPage = <Tokens />;
            }
            break;
    }

    if (githubContext.state.isLoggedIn) {
        return <div className="root">{renderPage}</div>;
    } else {
        return <div className="root">{renderPage}</div>;
    }
};

export default App;
