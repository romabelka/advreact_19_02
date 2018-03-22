import React, { Component } from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'

class Loader extends Component {

    render() {
        return (
            <View container = {styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})

export default Loader