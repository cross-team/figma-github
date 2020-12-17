import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {RouterController} from './providers/router-context';

ReactDOM.render(
    <RouterController>
        <App />
    </RouterController>,
    document.getElementById('react-page')
);
