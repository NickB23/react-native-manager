import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { coinUpdate } from '../actions';
import { CardSection, Input } from './common';

class CoinForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Coin"
            placeholder="Bitcoin"
            value={this.props.name}
            onChangeText={value => this.props.coinUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Qty"
            placeholder="40"
            value={`${this.props.qty}`}
            onChangeText={value => this.props.coinUpdate({ prop: 'qty', value })}
          />
        </CardSection>
        </View>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { name, qty } = state.coinForm;

    return { name, qty };
  };

  export default connect(mapStateToProps, { coinUpdate })(CoinForm);
