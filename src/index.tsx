import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import configureStore from './store';
import {Login, Profile} from './containers';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render((
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Login}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
