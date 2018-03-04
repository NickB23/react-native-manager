import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coinUpdate, coinCreate } from '../actions';
import { Card, CardSection, Button } from '../components/common';
import CoinForm from './CoinForm';

class CoinCreate extends Component {
  onButtonPress() {
    const { name, qty } = this.props;

    this.props.coinCreate({ name, qty });
  }

  render() {
    return (
      <Card>
        <CoinForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, qty } = state.coinForm;

  return { name, qty };
};

export default connect(mapStateToProps, { coinUpdate, coinCreate })(CoinCreate);
