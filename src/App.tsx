import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PasswordRecovery from './pages/RecoverPassword';
import EventRegistration from './pages/EventRegistration';

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recover_password" component={PasswordRecovery} />
          <Route exact path="/register_event" component={EventRegistration} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};