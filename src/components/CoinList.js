import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, View } from 'react-native';
import { Card, CardSection } from './common';
import { coinsFetch } from '../actions';
import ListItem from './ListItem';

class CoinList extends Component {
  componentWillMount() {
    this.props.coinsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    this.createDataSource(nextProps);
    console.log(nextProps); //TODO: REMOVE!!
  }

  createDataSource({ coins }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(coins);
  }

  renderRow(coin) {
    console.log(coin); // TODO: REMOVE
    return <ListItem coin={coin} />;
    // return <ListItem employee={employee} />;
  }

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Text>Your portfolio is worth: €1.000.000</Text>
          </CardSection>
        </Card>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { coins } = state.coins;

  return { coins };
  // const coins = _.map(state.coins, (val, uid) => {
  //   return { ...val, uid };
  // });
  //
  // return { coins };
};

export default connect(mapStateToProps, { coinsFetch })(CoinList);
