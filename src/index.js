import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';//needs to put above tacyons so that it doesnt clash woth the app set up classes//later install than tacyons
import 'tachyons';
import './index.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
