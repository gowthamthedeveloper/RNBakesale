import React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    }

    state = {
        searchTerm: '',
    }

    debouncedSearchDeals = debounce(this.props.searchDeals, 300);
    
    handleChange = (searchTerm) => {

        this.setState({searchTerm}, () => {
            console.log(searchTerm);
            this.debouncedSearchDeals(this.state.searchTerm);
        })

    }

    render() {
        return(
            <TextInput 
                style={styles.input} 
                placeholder='Search deals here...'
                onChangeText={this.handleChange}
                />
        );
    }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 12 
  },
});

export default SearchBar;