import { Scene, Router } from 'react-native-router-flux';
import React, { Component } from 'react';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import NavigationDrawer from './containers/NavigationDrawer';

class AppRouter extends Component {
  render() {
    return (
      <NavigationDrawer>
        <Router>
          <Scene key="root">
            <Scene key="login" title="login" component={Login} />
            <Scene key="dashboard" title="Bem vindo!" component={Dashboard} />
          </Scene>
        </Router>
      </NavigationDrawer>
    );
  }
}

export default AppRouter;
