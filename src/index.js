import React from 'react';
import ReactDOM from 'react-dom';
import reducers from "./reducers";
import App from './components/App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./middlewares";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
