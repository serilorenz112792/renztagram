import React, { useEffect } from 'react';
import './App.css';
import store from './store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadUser } from './container/loginpage/action'
import WelcomePage from './container/welcomepage'
import LoginPage from './container/loginpage'
import HomePage from './container/homepage'
import ProfilePage from './container/profilepage'
import NavBar from './container/navpage'
function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [loadUser])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/profile/:id" component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
