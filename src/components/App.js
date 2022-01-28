/* eslint-disable */

import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from 'react-native';
import DealList from './DealList';
import ajax from '../ajax';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends React.Component {

  titleXValue = new Animated.Value(0);

  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null
  }

  async componentDidMount() {
    this.animateTitle()
    const deals = await ajax.fetchDealsList();
    this.setState({ deals });
    // console.log(this.state.deals);
  };

  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 160;
    Animated.timing( this.titleXValue, {
        toValue: direction * width / 2,
        duration: 1000,
        easing: Easing.ease,
      }).start(({finished}) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm)
    }
    this.setState({ dealsFromSearch })

    console.log(this.state.dealsFromSearch);
  }

  setCurrentDeal = (dealId) => {
    this.setState({ currentDealId: dealId })
  }

  unSetCurrentDeal = () => {
    this.setState({ currentDealId: null })
  }

  currentDeal = () => {
    return this.state.deals.find((deal) => deal.key === this.state.currentDealId);
  }

  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail initialDealData={this.currentDeal()} onBack={this.unSetCurrentDeal}/>        
          </View>
      );
    }

    if (this.state.dealsFromSearch.length > 0 )
    {
      console.log('search result');

    }
    else
    {
      console.log('deal');

    }

    const dealsToDisplay = 
        this.state.dealsFromSearch.length > 0 
        ? this.state.dealsFromSearch
        : this.state.deals

    if (dealsToDisplay.length > 0 ) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals}/>
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}/>
        </View>
      );
    }
    return (
     <Animated.View style={[styles.container, {left: this.titleXValue}]}>
        <Text style={styles.title}>Bakesale</Text>
     </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  main: {
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center'
  }
});

export default App;
