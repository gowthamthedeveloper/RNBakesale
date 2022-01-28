/* eslint-disable */

import React from 'react';
import {Text, StyleSheet, View, Image, PanResponder, Animated, Dimensions, Linking, TouchableOpacity, Button} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
    };

    imageXValue = new Animated.Value(0);

    imagePanResponder = PanResponder.create ({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        this.imageXValue.setValue(gestureState.dx)
      },
      onPanResponderRelease: (event, gestureState) => {
        this.width = Dimensions.get('window').width;

        if (Math.abs(gestureState.dx) > this.width * 0.4) {
          const direcion = Math.sign(gestureState.dx);
          // -1 for left, 1 for right
          Animated.timing(this.imageXValue, {
            toValue: direcion * this.width,
            duration: 250,
          }).start(() => this.handleSwipe(-1 * direcion));
        } else {
          Animated.timing(this.imageXValue, {
            toValue: 0,
            duration: 250,
          }).start();
        }
      }
    });

  async componentDidMount() {
      const fullDeal = await ajax.fetchDealDetails(this.state.deal.key)
      this.setState({deal: fullDeal})
  };

  openDealUrl = () => {
    Linking.openURL(this.state.deal.url);
  };

  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXValue, {
        toValue: 0,
      }).start();
      return;
    }

    this.setState((prevState) => ({ 
      imageIndex: prevState.imageIndex + indexDirection
    }), () => {
      //Next Image Animation
      console.log(this.state.imageIndex);
      this.imageXValue.setValue(indexDirection * this.width);
      Animated.spring(this.imageXValue, {
        toValue: 0,
      }).start();
    });
  }

  

    render() {
      const { deal } = this.state;

        return(
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}>Back</Text>	
                </TouchableOpacity>
                <Animated.Image 
                    {...this.imagePanResponder.panHandlers}
                    style={[{left: this.imageXValue}, styles.image]}
                    source={{ uri: deal.media[this.state.imageIndex] }}/>
                <View style={styles.detail}>
                    <View>
                        <Text style={styles.title}>{deal.title}</Text>	
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.info}>
                            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                            <Text style={styles.cause}>{deal.cause.name}</Text>
                        </View>
                        {deal.user && (<View style={styles.user}>
                            <Image 
                                style={styles.avatar}
                                source={{ uri: deal.user.avatar }}/>
                            <Text>{deal.user.name}</Text>
                        </View>)}
                    </View>
                    <View style={styles.description}>
                        <Text>{deal.description}</Text>
                    </View>
                </View>
                <Button style={styles.buyDeal} 
                        title='Buy this deal!!' 
                        onPress={this.openDealUrl} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
  deal: {
    marginTop: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderTopWidth: 0
  },
  backLink: {
    marginLeft: 12,
    marginBottom: 10,
    color: '#0645ad',
  },
  image: {
    backgroundColor: "#ccc",
    width: '100%',
    height: 180
  },
  detail: {
   
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45 , 0.4)'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold'
  },
  cause: {
    marginVertical: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  username: {
    textAlign: 'center'
  },
  description: {
    margin: 10,
    padding: 10,
    borderStyle: 'dotted',
    borderColor: '#ddd',
    borderWidth: 1
  },
  buyDeal: {
    marginHorizontal: 30
  }
});

export default DealDetail;