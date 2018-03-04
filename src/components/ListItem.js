import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getCoinInfo } from '../actions';
import { CardSection } from './common';

class ListItem extends Component {
  componentWillMount() {
    const { name } = this.props.coin;

    this.props.getCoinInfo(name);
  }

  onRowPress() {
    Actions.coinEdit({ coin: this.props.coin });
  }

  render() {
    const { name, qty } = this.props.coin;
    console.log(this.props); //TODO: Remove!!

    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {`${qty} ${name}: ${this.props.coinName}`}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const apiinfo = state.apiinfo;

  return state.apiinfo;
};

export default connect(mapStateToProps, { getCoinInfo })(ListItem);
