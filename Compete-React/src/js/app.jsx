import React from 'react';
import ReactDom from 'react-dom';
import CompeteRouter from './components/CompeteRouter';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
ReactDom.render(
    <CompeteRouter />,
    document.getElementById('app')
);