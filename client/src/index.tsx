require('file-loader?name=[name].[ext]!./index.html');

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import './index.scss';
import App from './App';

function Root({ children }: { children: JSX.Element }) {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}

const rootElement = document.getElementById('root');

ReactDOM.render(
    <StrictMode>
        <Root>
            <App />
        </Root>
    </StrictMode>,
    rootElement)