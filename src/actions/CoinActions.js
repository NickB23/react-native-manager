import firebase from 'firebase';
import _ from 'lodash';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  COIN_UPDATE,
  COIN_CREATE,
  COINS_FETCH_SUCCESS,
  COIN_SAVE_SUCCESS,
  GET_COIN_INFO,
  COIN_FETCH_AND_PRICE_INFO_SUCCESS
} from './types';

export const coinUpdate = ({ prop, value }) => {
  return {
    type: COIN_UPDATE,
    payload: { prop, value }
  };
};

export const coinCreate = ({ name, qty }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/coins`)
    .push({ name, qty })
    .then(() => {
      dispatch({ type: COIN_CREATE });
      Actions.coinList({ type: 'reset' });
    });
  };
};

export const coinsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/coins`)
    .on('value', snapshot => {
      // Iterate through all the downloaded coins
      const coins = _.map(snapshot.val(), (val, uid) => {
        return { ...val, uid };
      });
      // Download coinValue for each coin
      const allCoinsArray = [];
      for (let x = 0; x < coins.length; x++) {
        // console.log(coins[x].name); //TODO: REMOVE!!
        const coinName = coins[x].name;
        fetch(`https://api.coinmarketcap.com/v1/ticker/${coinName}/?convert=EUR`)
        .then((response) => response.json())
        .then((responseJson) => {
          const { price_eur } = responseJson[0];
          // console.log(price_eur);
          coins[x].price = price_eur;
          // console.log(coins[x]); // TODO: REMOVE!!
          allCoinsArray.push(coins[x]);
          console.log(allCoinsArray);
          dispatch({ type: COIN_FETCH_AND_PRICE_INFO_SUCCESS, payload: allCoinsArray });
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
  };
};

export const coinSave = ({ name, qty, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/coins/${uid}`)
    .set({ name, qty })
    .then(() => {
      dispatch({ type: COIN_SAVE_SUCCESS });
      Actions.coinList({ type: 'reset' });
    });
  };
};

export const coinDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then(() => {
      Actions.coinList({ type: 'reset' });
    });
  };
};

// const getCoinInfo = (coinName) => {
//   return new Promise((resolve, reject) => {
//     fetch(`https://api.coinmarketcap.com/v1/ticker/${coinName}/?convert=EUR`)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       const { price_eur } = responseJson[0];
//       resolve(price_eur);
//     })
//     .catch((error) => {
//       console.error(error);
//       reject(Error(error));
//     });
//
//     if ( 1 + 1 === 2/* everything turned out fine */ ) {
//       resolve('Stuff worked!');
//     } else {
//       reject(Error('It broke'));
//     }
//   });
// };

// const getCoinInfo = (coinName) => {
//   return new Promise(function(resolve, reject) {
//     fetch(`https://api.coinmarketcap.com/v1/ticker/${coinName}/?convert=EUR`)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       const { price_eur } = responseJson[0];
//       resolve(price_eur);
//     })
//     .catch((error) => {
//       console.error(error);
//       reject(Error(error));
//     })
//   }
// }


// const getCoinInfo = new Promise(coinName, function(resolve, reject) {
//   fetch(`https://api.coinmarketcap.com/v1/ticker/${coinName}/?convert=EUR`)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       const { price_eur } = responseJson[0];
//
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
