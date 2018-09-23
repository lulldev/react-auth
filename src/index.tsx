import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login, Profile} from './containers';


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Login}/>
      <Route path="/profile" component={Profile}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
