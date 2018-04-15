import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import App from './App';
import './index.css';

const rootComponent = <Provider store={configureStore()}>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</Provider>;

ReactDOM.render(rootComponent, document.getElementById('root'));
registerServiceWorker();
