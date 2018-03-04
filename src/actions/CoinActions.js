import firebase from 'firebase';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  COIN_UPDATE,
  COIN_CREATE,
  COINS_FETCH_SUCCESS,
  COIN_SAVE_SUCCESS,
  GET_COIN_INFO
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
      dispatch({ type: COINS_FETCH_SUCCESS, payload: snapshot.val() });
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

// export const getCoinInfo = (coinName) => {
//   return (dispatch) => {
//   fetch(`https://api.coinmarketcap.com/v1/ticker/${coinName}/?convert=EUR`)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       // console.log(responseJson); //TODO: Remove
//       const { price_eur } = responseJson[0];
//       console.log(`price_eur: ${price_eur}`); //TODO: Remove
//       dispatch({ type: GET_COIN_INFO, payload: { coinName, price_eur } });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   };
// };
