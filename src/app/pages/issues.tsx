/** @jsx jsx */
import * as React from 'react';
import {css, jsx} from '@emotion/react';
import {Text} from 'react-figma-plugin-ds';
import GithubContext from '../providers/github-context';

declare function require(path: string): any;

function Issues({}) {
    var {getIssues} = React.useContext(GithubContext);
    const [issues, setIssues] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            let newIssues = await getIssues();
            setIssues(newIssues);
        }
        fetchData();
    }, []);

    var RootStyles = css`
        padding: 32px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    var IssueStyles = css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        margin-bottom: 16px;
        padding: 8px;
        border: 1px solid #e6e6e6;
        border-radius: 4px;

        p {
            margin: 2px 0 2px 0;
        }
    `;

    return (
        <div css={RootStyles}>
            <h1>Welcome to Issues</h1>
            {issues.map(issue => (
                <div css={IssueStyles} key={issue.id}>
                    <Text>Title: {issue.title}</Text>
                    <Text>Assignee: {issue.assignee.login}</Text>
                </div>
            ))}
        </div>
    );
}

export default Issues;
