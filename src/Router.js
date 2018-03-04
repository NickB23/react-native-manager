import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CoinList from './components/CoinList';
import CoinCreate from './components/CoinCreate';
import CoinEdit from './components/CoinEdit';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="login" component={LoginForm} title="Login" initial />
        <Scene
          onRight={() => Actions.coinCreate()}
          rightTitle="Add"
          key="coinList"
          component={CoinList}
          title="Coins"
          type="replace"
        />
        <Scene
          key="coinCreate"
          component={CoinCreate}
          title="Add Coin"
        />
        <Scene
          key="coinEdit"
          component={CoinEdit}
          title="Edit Coin Details"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
