import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {AppController} from './providers/app-context';

ReactDOM.render(
    <AppController>
        <App />
    </AppController>,
    document.getElementById('react-page')
);
