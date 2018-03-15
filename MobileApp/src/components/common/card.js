import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'

class Card extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View style = {styles.container}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        }
    }
})

export default Card