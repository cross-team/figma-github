import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import {AppController} from './providers/app-context';
import {GithubController} from './providers/github-context';
import {FigmaController} from './providers/figma-context';

ReactDOM.render(
    <AppController>
        <GithubController>
            <FigmaController>
                <App />
            </FigmaController>
        </GithubController>
    </AppController>,
    document.getElementById('react-page')
);
