/* eslint-disable */

import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';

class DealItem extends React.Component {
    props = {
        deal: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired
    };

    handlePress = () => {
      this.props.onPress(this.props.deal.key)
    }
    
    render() {
      const deal = this.props.deal;

        return(
            <TouchableOpacity style={styles.item}
                              onPress={this.handlePress}>
                <Image 
                    style={styles.image}
                    source={{ uri: deal.media[0] }}/>
                <View style={styles.subitem}>
                  <Text style={styles.title}>{deal.title}</Text>
                  <View style={styles.footer}>
                      <Text style={styles.cause}>{deal.cause.name}</Text>
                      <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                  </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
  item: {
    marginTop: 12
  },
  image: {
    backgroundColor: "#ccc",
    width: '100%',
    height: 180
  },
  subitem: {
    borderTopWidth: 0,
    borderWidth: 1,
    padding: 10,
    borderColor: '#bbb',
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  price: {
    flex: 1,
    textAlign: 'right'
  },
  cause: {
    flex: 2,
  },
});

export default DealItem;