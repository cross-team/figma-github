import * as React from 'react';
import Issues from './pages/issues';
import Tokens from './pages/tokens';
import RouterContext from './providers/router-context';
import './styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

declare function require(path: string): any;

const App = ({}) => {
    var routes = React.useContext(RouterContext);
    var renderPage;

    switch (routes.state.page) {
        case '/issues':
            renderPage = <Issues />;
            break;
        default:
            renderPage = <Tokens />;
            break;
    }

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

    return <div className="root">{renderPage}</div>;
};

export default App;
