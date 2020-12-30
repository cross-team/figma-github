/** @jsx jsx */
import * as React from 'react';
import {css, jsx} from '@emotion/react';
import {Button, Input, Label} from 'react-figma-plugin-ds';
import GithubContext from '../providers/github-context';
import FigmaContext from '../providers/figma-context';

declare function require(path: string): any;

function Tokens({}) {
    var githubContext = React.useContext(GithubContext);
    var figmaContext = React.useContext(FigmaContext);

    var RootStyles = css`
        padding: 32px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        // Input Styles
        .input {
            width: 100%;
        }
        input {
            border: 1px solid #e6e6e6;
            border-radius: 2px;
            &:hover {
                border: 1px solid #18a0fb;
                border-radius: 2px;
            }
            &:disabled {
                border: 1px solid #4bb543;
                border-radius: 2px;
                &:hover {
                    border: 1px solid #4bb543;
                    border-radius: 2px;
                }
            }
        }

        // Button Styles
        button {
            margin: 16px;
        }
    `;

    return (
        <div css={RootStyles}>
            <Label htmlFor="ghToken">GitHub Access Code</Label>
            <Input
                id="ghToken"
                name="ghToken"
                type="password"
                placeholder={githubContext.state.isLoggedIn ? 'Success!' : ''}
                isDisabled={githubContext.state.isLoggedIn}
                onChange={e => {
                    githubContext.setToken(e);
                }}
            />
            <Label htmlFor="figToken">Figma Access Code</Label>
            <Input
                id="figToken"
                name="figToken"
                type="password"
                placeholder={figmaContext.state.isLoggedIn ? 'Success!' : ''}
                isDisabled={figmaContext.state.isLoggedIn}
                onChange={e => {
                    figmaContext.setToken(e);
                }}
            />
            <Button
                onClick={async () => {
                    let responses = [];
                    if (!githubContext.state.isLoggedIn) {
                        await responses.push(githubContext.login());
                    }
                    if (!figmaContext.state.isLoggedIn) {
                        await responses.push(figmaContext.login());
                    }

                    await responses.forEach(response => {
                        console.log(response);
                    });
                }}
            >
                Login
            </Button>
        </div>
    );
}

export default Tokens;
