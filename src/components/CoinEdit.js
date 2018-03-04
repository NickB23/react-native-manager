import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoinForm from './CoinForm';
import { coinUpdate, coinSave, coinDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from '../components/common';


class CoinEdit extends Component {
  state = { showModal: false }

  componentWillMount() {
    _.each(this.props.coin, (value, prop) => {
      this.props.coinUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, qty } = this.props;

    this.props.coinSave({ name, qty, uid: this.props.coin.uid });
  }

  onAccept() {
    const { uid } = this.props.coin;

    this.props.coinDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <CoinForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete Coin
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, qty } = state.coinForm;

  return { name, qty };
};

export default connect(mapStateToProps, {
  coinUpdate, coinSave, coinDelete
})(CoinEdit);
